import { Request, Response } from 'express';
import { docker } from '..';
import {
  calculateCpuUsage,
  calculateMemoryUsage,
  sendWebhook,
} from '../helper';
import integrationData from '../integration.json';

export const getMetrics = async (req: Request, res: Response) => {
  const { containerId } = req.params;
  if (!containerId) {
    res.status(400).json({ error: 'containerId is required' });
    return;
  }
  try {
    const container = docker.getContainer(containerId);
    const stats = await container.stats({ stream: false });

    const cpuUsage = calculateCpuUsage(stats);
    const memoryUsage = calculateMemoryUsage(stats);

    res.json({
      containerId,
      cpuUsage: `${cpuUsage}%`,
      memoryUsage: `${memoryUsage}%`,
      status: 'healthy', // Add logic to determine health status
    });

    await sendWebhook();
  } catch (err) {
    console.error(`Error fetching metrics for container ${containerId}:`, err);
    res.status(500).json({ error: 'Failed to fetch container metrics' });
  }
};

export const getIntegrations = async (req: Request, res: Response) => {
  try {
    res.send(integrationData);
    await sendWebhook();
  } catch (error) {
    console.error(`Error fetching integration data`);
    res.status(500).json({ error: 'Failed to fetch integration data' });
  }
};

export const getContainerLogs = async (req: Request, res: Response) => {
  const { containerId } = req.params;
  if (!containerId) {
    res.status(400).json({ error: 'containerId is required' });
  }
  try {
    const container = docker.getContainer(containerId);
    const logsBuffer = await container.logs({
      follow: false,
      stdout: true,
      stderr: true,
      tail: 30,
    });
    const logs = logsBuffer.toString('utf8');

    res.json({ containerId, logs });
  } catch (error) {
    console.error(`Error fetching logs for container ${containerId}:`, error);
    res.status(500).json({ error: 'failed to fetch container logs' });
  }
};

export const restartContainer = async (req: Request, res: Response) => {
  const { containerId } = req.params;
  if (!containerId) {
    res.status(400).json({ error: 'containerId is required' });
  }
  try {
    const container = docker.getContainer(containerId);
    await container.restart();
  } catch (error) {
    console.error(`Error restaring for container ${containerId}:`, error);
    res.status(500).json({ error: 'Failed to restart container' });
  }
};

export const deleteContainer = async (req: Request, res: Response) => {
  const { containerId } = req.params;
  if (!containerId) {
    res.status(400).json({ error: 'containerId is required' });
  }
  try {
    const container = docker.getContainer(containerId);
    await container.remove();
    res.json({
      containerId,
      message: `Container ${containerId} has successfully being deleted.`,
    });
  } catch (error) {
    console.error(`Error deleting for container ${containerId}:`, error);
    res.status(500).json({ error: 'Failed to remove container' });
  }
};

export const stopContainer = async (req: Request, res: Response) => {
  const { containerId } = req.params;
  if (!containerId) {
    res.status(400).json({ error: 'containerId is required' });
  }
  try {
    const container = docker.getContainer(containerId);
    await container.stop();
    res.json({
      containerId,
      message: `Container ${containerId} has successfully being stopped.`,
    });
  } catch (error) {
    console.error(`Error stopping container ${containerId}:`, error);
    res.status(500).json({ error: 'Failed to stop container' });
  }
};

export const listContainers = async (req: Request, res: Response) => {
  try {
    const containers = await docker.listContainers();
    res.json(containers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to list running containers' });
  }
};

export const listImages = async (req: Request, res: Response) => {
  try {
    const images = await docker.listImages();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: 'Failed to list images' });
  }
};

export const getSystemStats = async (req: Request, res: Response) => {
  try {
    const info = await docker.info();
    res.json({
      containers: info.Containers,
      running: info.ContainersRunning,
      stopped: info.ContainersStopped,
      memoryLimit: info.MemTotal,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get system stats' });
  }
};
