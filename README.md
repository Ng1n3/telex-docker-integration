# Container Metrics API (Local Deployment Only)

## ⚠️ IMPORTANT: This API is designed for local deployment only ⚠️

This API provides container metrics by directly connecting to the Docker daemon through the local Unix socket. Due to this architectural design, __this application must be deployed on the same machine or network where your Docker containers are running__. It cannot be deployed to cloud platforms like Heroku, AWS, or similar services without significant modifications.
### Why Local Only?
---
This API requires direct access to the Docker daemon socket (/var/run/docker.sock) to:

- Fetch container metrics (CPU, memory)
- Access container logs
- Manage container lifecycle (stop, restart, delete)
- List running containers and images

These operations require privileged access that cloud platforms typically don't (and shouldn't) provide for security reasons.
Deployment Requirements

### Prerequisite
---
To run this API, you must have:

1. __Local Docker Installation__: Docker daemon running on the host machine
2. __Docker Socket Access__: Read/write permissions to ``/var/run/docker.sock``
3. __Node.js__: Version 16 or higher installed locally
4. __Network Access__: If monitoring remote Docker hosts, proper network access and Docker daemon configuration
5. __Package Manager__: [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) or [pnpm](htps://pnpm.org)

### Features
---

- **Fetch Container Metrics**: Get CPU and memory usage for a specific Docker container.
- **Fetch Container Logs**: Retrieve recent logs from a container.
- **Stop, Restart, and Delete Containers**: Manage container lifecycle.
- **List Running Containers**: Get a list of all currently running containers.
- **List Available Docker Images**: Fetch all Docker images present on the host system.
- **Fetch Integration Data**: Retrieve integration configuration data from a JSON file.
- **Webhook Support**: Trigger a webhook for key events like fetching metrics or deleting a container.
- **System Stats**: Get information about total containers, running/stopped containers, and memory usage.

### Recommended Deployment Methods
1. __Direct Local Installation__
``` Clone the repository
git clone https://github.com/Ng1n3/telex-docker-integration.git
cd container-metrics-api

# Install dependencies
npm install

# Start the server
npm start
```
2. __Docker Container (Same Host)__
``` Build the image
docker build -t container-metrics-api .

# Run with access to Docker socket
docker run -d \
  -p 3200:3200 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --name metrics-api \
  container-metrics-api
```
3. __Docker Compose__
``` version: '3.8'
services:
  metrics-api:
    build: .
    ports:
      - "3200:3200"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    restart: unless-stopped
```
### Security Considerations
---
When running this API:

- Do not expose it directly to the internet
- Use appropriate firewall rules to restrict access
- Implement authentication before exposing to other services
- Consider using HTTPS for any non-localhost access

### Alternative Approaches for Cloud Deployment
---
If you need to monitor containers in a cloud environment, consider:

1. Using cloud-native monitoring solutions:

- AWS CloudWatch for ECS/EKS
- Azure Monitor for AKS
- Google Cloud Monitoring for GKE


2. Using container orchestration platform metrics:

- Kubernetes Metrics API
- Docker Swarm metrics


3. Implementing platform-specific metrics collection:

- Heroku Metrics API
- Platform-specific monitoring add-ons


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



