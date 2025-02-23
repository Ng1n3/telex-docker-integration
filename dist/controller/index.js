"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIntegrations = exports.getMetrics = void 0;
const __1 = require("..");
const helper_1 = require("../helper");
const integration_json_1 = __importDefault(require("../integration.json"));
const getMetrics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { containerId } = req.params;
    try {
        const container = __1.docker.getContainer(containerId);
        // Fetch container stats
        const stats = yield container.stats({ stream: false });
        // Calculate CPU and memory usage
        const cpuUsage = (0, helper_1.calculateCpuUsage)(stats);
        const memoryUsage = (0, helper_1.calculateMemoryUsage)(stats);
        // Respond with metrics
        res.json({
            containerId,
            cpuUsage: `${cpuUsage}%`,
            memoryUsage: `${memoryUsage}%`,
            status: 'healthy', // Add logic to determine health status
        });
    }
    catch (err) {
        console.error('Failed to fetch container metrics:', err);
        res.status(500).json({ error: 'Failed to fetch container metrics' });
    }
});
exports.getMetrics = getMetrics;
const getIntegrations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(integration_json_1.default);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch integration data' });
    }
});
exports.getIntegrations = getIntegrations;
