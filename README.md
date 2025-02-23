# Container Metrics API

This is a Node.js-based API that provides container metrics (CPU and memory usage) for Docker containers. It also includes an endpoint to fetch integration data. The API is built using Express and interacts with the Docker daemon via the `dockerode` library.

---

## Features

- **Fetch Container Metrics**: Get CPU and memory usage for a specific Docker container.
- **Integration Data**: Retrieve integration configuration data from a JSON file.
- **Webhook Support**: Trigger a webhook when metrics are fetched or the home page is accessed.

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

### 1. **Home Page**
- **URL**: `/v1/api`
- **Method**: `GET`
- **Description**: Returns a welcome message and triggers a webhook.
- **Response**:
  ```json
  {
    "status": "OK",
    "message": "Container API is currently running"
  }
  ```

### 2. **Fetch Container Metrics**
- **URL**: `/v1/api/metrics/:containerId`
- **Method**: `GET`
- **Description**: Fetches CPU and memory usage for a specific Docker container.
- **Parameters**:
  - `containerId` (string): The ID of the Docker container.
- **Response**:
  ```json
  {
    "containerId": "abc123",
    "cpuUsage": "25%",
    "memoryUsage": "50%",
    "status": "healthy"
  }
  ```

### 3. **Fetch Integration Data**
- **URL**: `/v1/api/integration.json`
- **Method**: `GET`
- **Description**: Returns integration configuration data from a JSON file.
- **Response**:
  ```json
  {
    "integration": {
      "name": "example",
      "config": {
        "key": "value"
      }
    }
  }
  ```

---

## Webhook Integration

The API triggers a webhook whenever:
- The home page (`/v1/api`) is accessed.
- The `/metrics/:containerId` endpoint is called.

The webhook sends a POST request to the following URL:
```
https://ping.telex.im/v1/webhooks/019533f0-9c57-73da-a217-788efd707793
```

The payload sent to the webhook is:
```json
{
  "event_name": "container_metrics",
  "message": "Metrics fetched successfully",
  "status": "success",
  "username": "collins"
}
```

---

## Docker Setup

The API interacts with the Docker daemon using the `dockerode` library. By default, it connects to the Docker socket at `/var/run/docker.sock`. If you're running Docker remotely, update the Docker configuration in `src/index.ts`:

```typescript
export const docker = new Docker({
  host: process.env.DOCKER_HOST,
  port: process.env.DOCKER_PORT,
  ca: process.env.DOCKER_CA,
  cert: process.env.DOCKER_CERT,
  key: process.env.DOCKER_KEY,
});
```

---

## Environment Variables

| Variable            | Description                          | Default Value               |
|---------------------|--------------------------------------|-----------------------------|
| `PORT`              | Port on which the server runs        | `3200`                      |
| `DOCKER_SOCKET_PATH`| Path to the Docker socket            | `/var/run/docker.sock`      |
| `DOCKER_HOST`       | Docker host (for remote connections) | -                           |
| `DOCKER_PORT`       | Docker port (for remote connections) | -                           |
| `DOCKER_CA`         | Docker CA certificate               | -                           |
| `DOCKER_CERT`       | Docker client certificate           | -                           |
| `DOCKER_KEY`        | Docker client key                   | -                           |

---

## Running Tests

To run tests, use the following command:
```bash
npm test
```

---

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a detailed description of your changes.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [Express](https://expressjs.com/) for the web framework.
- [Dockerode](https://github.com/apocas/dockerode) for interacting with Docker.
- [Axios](https://axios-http.com/) for making HTTP requests.

---

## Support

For any issues or questions, please open an issue on the [GitHub repository](https://github.com/your-username/container-metrics-api/issues).

---

Enjoy using the Container Metrics API! 🚀

--- 

This `README.md` provides a comprehensive guide for anyone looking to use or contribute to your project. You can customize it further to suit your specific needs.