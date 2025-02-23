import { Router } from 'express';
import {
  deleteContainer,
  getContainerLogs,
  getIntegrations,
  getMetrics,
  getSystemStats,
  listContainers,
  listImages,
  restartContainer,
  stopContainer,
} from '../controller';

const router = Router();

router.get('/metrics/:containerId', getMetrics);
router.get('/integration.json', getIntegrations);
router.get('/logs/:containerId', getContainerLogs);
router.post('/container/:containerId/stop', stopContainer);
router.post('/container/:containerId/restart', restartContainer);
router.get('/containers', listContainers);
router.get('/images', listImages);
router.get('/container/stats', getSystemStats);
router.delete('/container/:containerId', deleteContainer);

export default router;
