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
exports.getSystemStats = exports.listImages = exports.listContainers = exports.stopContainer = exports.deleteContainer = exports.restartContainer = exports.getContainerLogs = exports.getIntegrations = exports.getMetrics = void 0;
const __1 = require("..");
const helper_1 = require("../helper");
const integration_json_1 = __importDefault(require("../integration.json"));
const getMetrics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { containerId } = req.params;
    if (!containerId) {
        yield (0, helper_1.sendWebhook)((0, helper_1.createWebHookPayload)('container_metrics_error', 'container ID missing', 'error', { containerId }));
        res.status(400).json({ error: 'containerId is required' });
        return;
    }
    try {
        const container = __1.docker.getContainer(containerId);
        const stats = yield container.stats({ stream: false });
        const cpuUsage = (0, helper_1.calculateCpuUsage)(stats);
        const memoryUsage = (0, helper_1.calculateMemoryUsage)(stats);
        const metricsData = {
            containerId,
            cpuUsage: `${cpuUsage}%`,
            memoryUsage: `${memoryUsage}%`,
            status: 'healthy', // Add logic to determine health status
        };
        res.json(metricsData);
        yield (0, helper_1.sendWebhook)((0, helper_1.createWebHookPayload)('container_metrics_fetched', `metrics fetched for container ${containerId}`, 'success', metricsData));
    }
    catch (err) {
        const errorMessage = `Error fetching metrics for container ${containerId}:`;
        console.error(errorMessage, err);
        yield (0, helper_1.sendWebhook)((0, helper_1.createWebHookPayload)('container_metrics_error', errorMessage, 'error', {
            containerId,
            error: err.message,
        }));
        res.status(500).json({ error: 'Failed to fetch container metrics' });
    }
});
exports.getMetrics = getMetrics;
const getIntegrations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(integration_json_1.default);
        yield (0, helper_1.sendWebhook)((0, helper_1.createWebHookPayload)('integrations_fetched', 'integrations fetched successfully', 'success', { integrations: integration_json_1.default }));
    }
    catch (error) {
        console.error(`Error fetching integration data`);
        res.status(500).json({ error: 'Failed to fetch integration data' });
    }
});
exports.getIntegrations = getIntegrations;
const getContainerLogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { containerId } = req.params;
    if (!containerId) {
        res.status(400).json({ error: 'containerId is required' });
    }
    try {
        const container = __1.docker.getContainer(containerId);
        const logsBuffer = yield container.logs({
            follow: false,
            stdout: true,
            stderr: true,
            tail: 30,
        });
        const logs = logsBuffer.toString('utf8');
        res.json({ containerId, logs });
    }
    catch (error) {
        console.error(`Error fetching logs for container ${containerId}:`, error);
        res.status(500).json({ error: 'failed to fetch container logs' });
    }
});
exports.getContainerLogs = getContainerLogs;
const restartContainer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { containerId } = req.params;
    if (!containerId) {
        res.status(400).json({ error: 'containerId is required' });
    }
    try {
        const container = __1.docker.getContainer(containerId);
        yield container.restart();
    }
    catch (error) {
        console.error(`Error restaring for container ${containerId}:`, error);
        res.status(500).json({ error: 'Failed to restart container' });
    }
});
exports.restartContainer = restartContainer;
const deleteContainer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { containerId } = req.params;
    if (!containerId) {
        yield (0, helper_1.sendWebhook)((0, helper_1.createWebHookPayload)('container_metrics_error', 'container ID missing', 'error', { containerId }));
        res.status(400).json({ error: 'containerId is required' });
    }
    try {
        const container = __1.docker.getContainer(containerId);
        yield container.remove();
        yield (0, helper_1.sendWebhook)((0, helper_1.createWebHookPayload)('container_deleted', `container ${containerId} deleted successfully`, 'success', { containerId }));
        res.json({
            containerId,
            message: `Container ${containerId} has successfully being deleted.`,
        });
    }
    catch (error) {
        const errMessage = `Error deleting for container ${containerId}:`;
        console.error(errMessage, error);
        yield (0, helper_1.sendWebhook)((0, helper_1.createWebHookPayload)('container_delete_error', errMessage, 'error', {
            containerId,
            error: error.message,
        }));
        res.status(500).json({ error: 'Failed to remove container' });
    }
});
exports.deleteContainer = deleteContainer;
const stopContainer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { containerId } = req.params;
    if (!containerId) {
        yield (0, helper_1.sendWebhook)((0, helper_1.createWebHookPayload)('container_stop_error', `Container ID missing`, 'error', { containerId }));
        res.status(400).json({ error: 'containerId is required' });
    }
    try {
        const container = __1.docker.getContainer(containerId);
        yield container.stop();
        yield (0, helper_1.sendWebhook)((0, helper_1.createWebHookPayload)('container_stopped', `Container ${containerId} stopped successfully`, 'success', { containerId }));
        res.json({
            containerId,
            message: `Container ${containerId} has successfully being stopped.`,
        });
    }
    catch (error) {
        const errMessage = `Error stopping container ${containerId}:`;
        console.error(errMessage, error);
        yield (0, helper_1.sendWebhook)((0, helper_1.createWebHookPayload)('container_stop_error', errMessage, 'error', {
            containerId,
            error: error.message,
        }));
        res.status(500).json({ error: 'Failed to stop container' });
    }
});
exports.stopContainer = stopContainer;
const listContainers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const containers = yield __1.docker.listContainers();
        res.json(containers);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to list running containers' });
    }
});
exports.listContainers = listContainers;
const listImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const images = yield __1.docker.listImages();
        res.json(images);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to list images' });
    }
});
exports.listImages = listImages;
const getSystemStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const info = yield __1.docker.info();
        res.json({
            containers: info.Containers,
            running: info.ContainersRunning,
            stopped: info.ContainersStopped,
            memoryLimit: info.MemTotal,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get system stats' });
    }
});
exports.getSystemStats = getSystemStats;
