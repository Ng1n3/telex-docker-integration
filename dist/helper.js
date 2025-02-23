"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateMemoryUsage = exports.calculateCpuUsage = void 0;
const calculateCpuUsage = (stats) => {
    const cpuDelta = stats.cpu_stats.cpu_usage.total_usage - stats.precpu_stats.cpu_usage.total_usage;
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
