import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorizeRoles } from '../middleware/auth';
import type { AuthRequest } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        job: true,
      },
    });

    res.json(notifications);
  } catch (error) {
    console.error('[GET /notifications] Error:', error);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

router.patch('/:id/read', authenticate, async (req: AuthRequest, res) => {
  const id = parseInt(req.params.id);
  try {
    const updated = await prisma.notification.update({
      where: { id },
      data: { read: true },
    });
    res.json(updated);
  } catch (error) {
    console.error('[PATCH /notifications/:id/read] Error:', error);
    res.status(500).json({ error: 'Failed to update notification' });
  }
});

router.patch('/read-all', authenticate, authorizeRoles('MODERATOR'), async (req: AuthRequest, res) => {
  try {
    const modId = req.user!.id;
    const updated = await prisma.notification.updateMany({
      where: { modId, read: false },
      data: { read: true },
    });
    res.json({ updatedCount: updated.count });
  } catch (err) {
    console.error('[PATCH /notifications/read-all] Error:', err);
    res.status(500).json({ error: 'Failed to update notifications' });
  }
});



export default router;
