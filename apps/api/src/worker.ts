import 'dotenv/config';
import { Worker } from 'bullmq';

new Worker('health', async job => {
  console.log('[worker] health job:', job.id, job.name, job.data);
}, { connection: { url: process.env.REDIS_URL! } });

console.log('Worker online for queue: health');
