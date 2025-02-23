"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.docker = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const router_1 = __importDefault(require("./routes/router"));
const dockerode_1 = __importDefault(require("dockerode"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3200;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use('/v1/api', router_1.default);
exports.docker = new dockerode_1.default({
    socketPath: '/var/run/docker.sock', // Use Docker socket for local access
    // OR for remote Docker:
    // host: process.env.DOCKER_HOST,
    // port: process.env.DOCKER_PORT,
    // ca: process.env.DOCKER_CA,
    // cert: process.env.DOCKER_CERT,
    // key: process.env.DOCKER_KEY,
});
app.get('/v1/api', (req, res) => {
    res.send({
        status: 'OK',
        message: "Container API is currently running"
    });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
