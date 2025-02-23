export const WEBHOOK_URL =
  'https://ping.telex.im/v1/webhooks/019533f0-9c57-73da-a217-788efd707793';
const WEBHOOK_DATA = {
  event_name: 'container_metrics',
  message: 'Metrics fetched successfully',
  status: 'success',
  username: 'collins',
};

// Function to send webhook
export const sendWebhook = async () => {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(WEBHOOK_DATA),
    });

    const result = await response.json();
    console.log('Webhook sent successfully:', result);
  } catch (error) {
    console.error('Failed to send webhook:', error);
  }
};

export const calculateCpuUsage = (stats: any) => {
  const cpuDelta =
    stats.cpu_stats.cpu_usage.total_usage -
    stats.precpu_stats.cpu_usage.total_usage;
  const systemDelta =
    stats.cpu_stats.system_cpu_usage - stats.precpu_stats.system_cpu_usage;
  const cpuPercent =
    (cpuDelta / systemDelta) * stats.cpu_stats.online_cpus * 100;
  return cpuPercent.toFixed(2);
};

export const calculateMemoryUsage = (stats: any) => {
  const memoryUsage = stats.memory_stats.usage;
  const memoryLimit = stats.memory_stats.limit;
  const memoryPercent = (memoryUsage / memoryLimit) * 100;
  return memoryPercent.toFixed(2);
};
