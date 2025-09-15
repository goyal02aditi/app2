"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const chat_routes_1 = __importDefault(require("./routes/chat.routes"));
const admin_route_1 = __importDefault(require("./routes/admin.route"));
const consent_routes_1 = __importDefault(require("./routes/consent.routes"));
const usagelog_routes_1 = __importDefault(require("./routes/usagelog.routes"));
const notification_route_1 = __importDefault(require("./routes/notification.route"));
require("./jobs/notification.job");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: true, // Allow all origins for development
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    preflightContinue: false,
    optionsSuccessStatus: 204
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// API Routes
app.use('/api/v1/user', user_route_1.default);
app.use('/api/v1/chat', chat_routes_1.default);
app.use('/api/v1/admin', admin_route_1.default);
app.use("/api/v1/consent", consent_routes_1.default);
app.use("/api/v1/usage", usagelog_routes_1.default);
app.use('/api/v1/notification', notification_route_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map