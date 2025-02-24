interface webhookPayload {
  event_name: string;
  message: string;
  status: 'success' | 'error' | 'warning';
  username: string;
}

export const WEBHOOK_URL =
  'https://ping.telex.im/v1/webhooks/019533f0-9c57-73da-a217-788efd707793';

export const createWebHookPayload = (
  eventName: string,
  message: string,
  status: webhookPayload['status'] = 'success',
): webhookPayload => ({
  event_name: eventName,
  message,
  status,
  username: 'muyiwa',
});

// Function to send webhook
export const sendWebhook = async (payload: webhookPayload) => {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    console.log('Webhook sent successfully:', result);
  } catch (error) {
    console.error('Failed to send webhook:', error);
    throw error;
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
