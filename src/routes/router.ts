import { Router } from 'express';
import { getIntegrations, getMetrics } from '../controller';

const router = Router();

router.get('/metrics/:containerId', getMetrics);
router.get('/integration.json', getIntegrations);

export default router;