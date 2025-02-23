import cors from 'cors';
import Docker from 'dockerode';
import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import { sendWebhook } from './helper';
import router from './routes/router';
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3200;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use('/v1/api', router);

export const docker = new Docker({
  socketPath: '/var/run/docker.sock', // Use Docker socket for local access
  // OR for remote Docker:
  // host: process.env.DOCKER_HOST,
  // port: process.env.DOCKER_PORT,
  // ca: process.env.DOCKER_CA,
  // cert: process.env.DOCKER_CERT,
  // key: process.env.DOCKER_KEY,
});

app.get('/v1/api', async (req: Request, res: Response) => {
  res.send({
    status: 'OK',
    message: 'Container API is currently running',
  });
  await sendWebhook();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
