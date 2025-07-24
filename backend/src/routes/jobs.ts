import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middleware/auth';
import type { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const jobs = await prisma.position.findMany({
      include: {
        jobDescriptions: true,
        additionalOffices: true,
        notifications: true,
      },
    });

    res.json({
      user: req.user,
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
              message: `${userEmail} posted a new job: ${newPosition.name}`,
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


export default router;
