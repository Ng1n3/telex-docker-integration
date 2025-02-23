import { Request, Response } from 'express';
import { docker } from '..';
import { calculateCpuUsage, calculateMemoryUsage, sendWebhook } from '../helper';
import integrationData from '../integration.json';

export const getMetrics = async (req: Request, res: Response) => {
  const { containerId } = req.params;
  try {
    const container = docker.getContainer(containerId);

    // Fetch container stats
    const stats = await container.stats({ stream: false });

    // Calculate CPU and memory usage
    const cpuUsage = calculateCpuUsage(stats);
    const memoryUsage = calculateMemoryUsage(stats);

    // Respond with metrics
    res.json({
      containerId,
      cpuUsage: `${cpuUsage}%`,
      memoryUsage: `${memoryUsage}%`,
      status: 'healthy', // Add logic to determine health status
    });

    await sendWebhook();
  } catch (err) {
    console.error('Failed to fetch container metrics:', err);
    res.status(500).json({ error: 'Failed to fetch container metrics' });
  }
};

export const getIntegrations = async (req: Request, res: Response) => {
  try {
    res.send(integrationData);
    await sendWebhook()
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch integration data' });
  }
};
