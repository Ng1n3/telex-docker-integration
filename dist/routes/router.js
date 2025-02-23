"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../controller");
const router = (0, express_1.Router)();
router.get('/metrics/:containerId', controller_1.getMetrics);
router.get('/integration.json', controller_1.getIntegrations);
exports.default = router;
