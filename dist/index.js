"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.docker = void 0;
const cors_1 = __importDefault(require("cors"));
const dockerode_1 = __importDefault(require("dockerode"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const helper_1 = require("./helper");
const router_1 = __importDefault(require("./routes/router"));
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
app.get('/v1/api', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send({
        status: 'OK',
        message: 'Container API is currently running',
    });
    yield (0, helper_1.sendWebhook)((0, helper_1.createWebHookPayload)('api_status', 'API is running smoothly', 'success'));
}));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
