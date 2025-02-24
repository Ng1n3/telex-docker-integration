# Container Metrics API

This is a Node.js-based API that provides container metrics (CPU and memory usage) for Docker containers. It also includes endpoints for managing containers, fetching integration data, and retrieving system statistics. The API is built using Express and interacts with the Docker daemon via the `dockerode` library.

---

## Features

- **Fetch Container Metrics**: Get CPU and memory usage for a specific Docker container.
- **Fetch Container Logs**: Retrieve recent logs from a container.
- **Stop, Restart, and Delete Containers**: Manage container lifecycle.
- **List Running Containers**: Get a list of all currently running containers.
- **List Available Docker Images**: Fetch all Docker images present on the host system.
- **Fetch Integration Data**: Retrieve integration configuration data from a JSON file.
- **Webhook Support**: Trigger a webhook for key events like fetching metrics or deleting a container.
- **System Stats**: Get information about total containers, running/stopped containers, and memory usage.

---

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Docker](https://www.docker.com/) (to interact with Docker containers)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) (package manager)

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/container-metrics-api.git
   cd container-metrics-api
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=3200
   DOCKER_SOCKET_PATH=/var/run/docker.sock
   ```

4. **Start the server**:
   ```bash
   npm start
   ```

   The server will start on `http://localhost:3200`.

---

## API Endpoints

### 1. **Fetch Container Metrics**
- **URL**: `/metrics/:containerId`
- **Method**: `GET`
- **Description**: Fetches CPU and memory usage for a specific Docker container.
- **Response**:
  ```json
  {
    "containerId": "abc123",
    "cpuUsage": "25%",
    "memoryUsage": "50%",
    "status": "healthy"
  }
  ```

### 2. **Fetch Integration Data**
- **URL**: `/integration.json`
- **Method**: `GET`
- **Description**: Fetches integration data from `integration.json`.
- **Response**:
  ```json
  {
    "integrations": [ ... ]
  }
  ```

### 3. **Fetch Container Logs**
- **URL**: `/logs/:containerId`
- **Method**: `GET`
- **Description**: Fetches the latest logs from the specified container.
- **Response**:
  ```json
  {
    "containerId": "abc123",
    "logs": "...logs here..."
  }
  ```

### 4. **Stop a Container**
- **URL**: `/container/:containerId/stop`
- **Method**: `POST`
- **Description**: Stops the specified container.

### 5. **Restart a Container**
- **URL**: `/container/:containerId/restart`
- **Method**: `POST`
- **Description**: Restarts the specified container.

### 6. **Delete a Container**
- **URL**: `/container/:containerId`
- **Method**: `DELETE`
- **Description**: Deletes the specified container.

### 7. **List Running Containers**
- **URL**: `/containers`
- **Method**: `GET`
- **Description**: Lists all currently running containers.

### 8. **List Available Docker Images**
- **URL**: `/images`
- **Method**: `GET`
- **Description**: Lists all available Docker images.

### 9. **Fetch System Stats**
- **URL**: `/container/stats`
- **Method**: `GET`
- **Description**: Fetches Docker system statistics including total containers, running/stopped containers, and memory limit.

---

## Webhook Events

The API triggers webhook events for key actions:

- `container_metrics_fetched` - When metrics are successfully retrieved.
- `container_deleted` - When a container is deleted.
- `container_stop_error` - If an error occurs when stopping a container.
- `container_stopped` - When a container is successfully stopped.
- `container_restart_error` - If an error occurs when restarting a container.
- `container_restarted` - When a container is successfully restarted.
- `container_logs_fetched` - When logs are successfully retrieved.

---

## Running with Docker

To run this API inside a Docker container:

1. **Build the Docker image**:
   ```bash
   docker build -t container-metrics-api .
   ```

2. **Run the container**:
   ```bash
   docker run -p 3200:3200 -v /var/run/docker.sock:/var/run/docker.sock container-metrics-api
   ```

---

## Contributing

If you would like to contribute, feel free to submit a pull request or open an issue.



