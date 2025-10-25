import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seedFakeData() {
  // users
  const admin = await prisma.user.upsert({
    where: { email: 'admin@sentinel.local' },
    update: {},
    create: { email: 'admin@sentinel.local', name: 'Admin', role: 'ADMIN' }
  });
  const approver = await prisma.user.upsert({
    where: { email: 'approver@sentinel.local' },
    update: {},
    create: { email: 'approver@sentinel.local', name: 'Approver', role: 'APPROVER' }
  });
  const eng = await prisma.user.upsert({
    where: { email: 'eng@sentinel.local' },
    update: {},
    create: { email: 'eng@sentinel.local', name: 'Engineer', role: 'ENGINEER' }
  });

  // templates
  await prisma.template.upsert({
    where: { key: 'preview-env' },
    update: {},
    create: {
      key: 'preview-env',
      name: 'Preview Environment',
      paramsSchema: { branch: 'string', size: ['small','med','large'], ttlHours: 'number' }
    }
  });

  await prisma.template.upsert({
    where: { key: 'db-only' },
    update: {},
    create: {
      key: 'db-only',
      name: 'DB Only (Postgres)',
      paramsSchema: { dbVersion: 'string', dbSize: ['tiny','small','med'], ttlHours: 'number' }
    }
  });

  console.log({ admin, approver, eng });
}

seedFakeData().finally(() => prisma.$disconnect());