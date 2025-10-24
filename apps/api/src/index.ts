import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { Queue } from 'bullmq';
import { Redis } from "ioredis"

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

const redis = new Redis(process.env.REDIS_URL!);
const healthQ = new Queue('health', { connection: { url: process.env.REDIS_URL! } });

app.get('/health', async (_req, res) => {
  try {
    await redis.ping();
    await healthQ.add('ping', { at: new Date().toISOString() });
    res.json({ ok: true, api: 'up', redis: 'ok' });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e) });
  }
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`API on http://localhost:${port}`));
