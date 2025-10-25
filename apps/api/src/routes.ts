import { Router } from 'express';
import { prisma } from './db';
import { z } from 'zod';

export const router: Router = Router();

// Mock auth middleware
router.use(async (req, _res, next) => {
  (req as any).user = await prisma.user.findUnique({
    where: { email: (req.header('x-user') || 'eng@sentinel.local') }
  });
  next();
});

router.get('/templates', async (_req, res) => {
  const templates = await prisma.template.findMany({ orderBy: { name: 'asc' }});
  res.json(templates);
});

const createReqSchema = z.object({
  templateKey: z.string(),
  env: z.enum(['DEV','STAGE','PROD']),
  params: z.any()
});

router.post('/requests', async (req, res) => {
  const parsed = createReqSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);

  const { templateKey, env, params } = parsed.data;
  const template = await prisma.template.findUnique({ where: { key: templateKey }});
  if (!template) return res.status(404).json({ error: 'template not found' });

  const user = (req as any).user!;
  const newRequest = await prisma.request.create({
    data: {
      templateId: template.id,
      env,
      params,
      createdById: user.id,
    },
    include: { template: true, createdBy: true }
  });
  res.status(201).json(newRequest);
});

router.get('/requests', async (req, res) => {
  const env = req.query.env as any | undefined;
  const where:any = {};
  if (env) where.env = env;
  const requests = await prisma.request.findMany({
    where, 
    include: { template: true, createdBy: true }, 
    orderBy: { createdAt: 'desc' }
  });
  res.json(requests);
});
