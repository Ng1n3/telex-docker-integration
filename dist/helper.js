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
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateMemoryUsage = exports.calculateCpuUsage = exports.sendWebhook = exports.createWebHookPayload = exports.WEBHOOK_URL = void 0;
exports.WEBHOOK_URL = 'https://ping.telex.im/v1/webhooks/019533f0-9c57-73da-a217-788efd707793';
const createWebHookPayload = (eventName, message, status = 'success', metadata) => ({
    event_name: eventName,
    message,
    status,
    username: 'muyiwa',
    timestamp: new Date().toISOString(),
    metadata,
});
exports.createWebHookPayload = createWebHookPayload;
// Function to send webhook
const sendWebhook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(exports.WEBHOOK_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        const result = yield response.json();
        console.log('Webhook sent successfully:', result);
    }
    catch (error) {
        console.error('Failed to send webhook:', error);
        throw error;
    }
});
exports.sendWebhook = sendWebhook;
const calculateCpuUsage = (stats) => {
    const cpuDelta = stats.cpu_stats.cpu_usage.total_usage -
        stats.precpu_stats.cpu_usage.total_usage;
    const systemDelta = stats.cpu_stats.system_cpu_usage - stats.precpu_stats.system_cpu_usage;
    const cpuPercent = (cpuDelta / systemDelta) * stats.cpu_stats.online_cpus * 100;
    return cpuPercent.toFixed(2);
};
exports.calculateCpuUsage = calculateCpuUsage;
const calculateMemoryUsage = (stats) => {
    const memoryUsage = stats.memory_stats.usage;
    const memoryLimit = stats.memory_stats.limit;
    const memoryPercent = (memoryUsage / memoryLimit) * 100;
    return memoryPercent.toFixed(2);
};
exports.calculateMemoryUsage = calculateMemoryUsage;
