import { Request, Response } from 'express';
import { docker } from '..';
import { calculateCpuUsage, calculateMemoryUsage } from '../helper';

export const getMetrics = async (req: Request, res: Response ) => {
  console.log('request param: ', req.params);
  const { containerId } = req.params;
  console.log('containerId', containerId);

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
  } catch (err) {
    console.error('Failed to fetch container metrics:', err);
    res.status(500).json({ error: 'Failed to fetch container metrics' });
  }
};
