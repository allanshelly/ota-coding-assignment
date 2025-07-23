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

export default router;
