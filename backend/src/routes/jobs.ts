import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorizeRoles } from '../middleware/auth';
import type { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', authenticate, async (req: AuthRequest, res) => {
  try {

    const status = req.query.status as 'PENDING' | 'APPROVED' | 'SPAM' | undefined;
    const isMod = req.user?.role === 'MODERATOR';

    if (status && status !== 'APPROVED' && !isMod) {
      return res.status(403).json({ error: 'Forbidden: Only moderators can view non-approved jobs.' });
    }
    
    const jobs = await prisma.position.findMany({
      include: {
        jobDescriptions: true,
        additionalOffices: true,
        notifications: true,
      },
      where: {
        status: status || 'APPROVED',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({
      jobs,
    });
  } catch (error) {
    console.error('[GET /jobs] Error:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

router.post('/', authenticate, async (req: AuthRequest, res) => {
  const { positionData, jobDescriptions, additionalOffices } = req.body;

  if (!positionData || !jobDescriptions || !additionalOffices) {
    return res.status(400).json({ error: 'Missing job data fields' });
  }

  try {
    const userId = req.user?.id;
    const userEmail = req.user?.email;
    const otherModerators = await prisma.user.findMany({
      where: {
        role: "MODERATOR",
        id: {
          not: userId,
        },
      },
    });

    const existingJobs = await prisma.position.count({
      where: { userId },
    });

    const newPosition = await prisma.position.create({
      data: {
        ...positionData,
        userId,
        jobDescriptions: {
          create: jobDescriptions,
        },
        additionalOffices: {
          create: additionalOffices,
        },
      },
      include: {
        jobDescriptions: true,
        additionalOffices: true,
      },
    });

    if (existingJobs === 0) {
      await Promise.all(
        otherModerators.map((mod) =>
          prisma.notification.create({
            data: {
              title: "New Job Posted",
              message: `${userEmail} posted a new job: ${newPosition.name}, ${newPosition.jobDescriptions}`,
              jobId: newPosition.id,
              modId: mod.id,
              read: false,
            },
          })
        )
      );
    }

    res.status(201).json(newPosition);
  } catch (error) {
    console.error('[POST /jobs] Error:', error);
    res.status(500).json({ error: 'Failed to create job' });
  }
});

router.patch('/:id/approve', authenticate, authorizeRoles('MODERATOR'), async (req, res) => {
  const jobId = parseInt(req.params.id);
  try {
    const job = await prisma.position.update({
      where: { id: jobId },
      data: { status: 'APPROVED' },
    });
    res.json(job);
  } catch (error) {
    console.error('[PATCH /jobs/:id/approve] Error:', error);
    res.status(500).json({ error: 'Failed to approve job' });
  }
});

router.patch('/:id/spam', authenticate, authorizeRoles('MODERATOR'), async (req, res) => {
  const jobId = parseInt(req.params.id);
  try {
    const job = await prisma.position.update({
      where: { id: jobId },
      data: { status: 'SPAM' },
    });
    res.json(job);
  } catch (error) {
    console.error('[PATCH /jobs/:id/spam] Error:', error);
    res.status(500).json({ error: 'Failed to mark job as spam' });
  }
});



export default router;
