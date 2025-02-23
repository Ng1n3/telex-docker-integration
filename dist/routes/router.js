"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../controller");
const router = (0, express_1.Router)();
router.get('/metrics/:containerId', controller_1.getMetrics);
router.get('/integration.json', controller_1.getIntegrations);
router.get('/logs/:containerId', controller_1.getContainerLogs);
router.post('/container/:containerId/stop', controller_1.stopContainer);
router.post('/container/:containerId/restart', controller_1.restartContainer);
router.get('/containers', controller_1.listContainers);
router.get('/images', controller_1.listImages);
router.get('/container/stats', controller_1.getSystemStats);
router.delete('/container/:containerId', controller_1.deleteContainer);
exports.default = router;
