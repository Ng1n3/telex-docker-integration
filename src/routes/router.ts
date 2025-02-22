import { Router } from 'express';
import { getMetrics } from '../controller';

const router = Router();

router.get('/metrics/:containerId', getMetrics);

export default router;
