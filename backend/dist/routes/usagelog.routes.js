"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usage_controller_1 = require("../controllers/usage.controller");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
router.post("/", authMiddleware_1.default, usage_controller_1.saveUsageLogs);
exports.default = router;
//# sourceMappingURL=usagelog.routes.js.map