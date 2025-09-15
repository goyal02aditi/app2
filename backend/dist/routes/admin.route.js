"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const adminAuthMiddleware_1 = __importDefault(require("../middleware/adminAuthMiddleware"));
const validationMiddleware_1 = require("../middleware/validationMiddleware");
const authSchema_1 = require("../validation/authSchema");
const router = (0, express_1.Router)();
// Public routes (no auth required)
router.post("/login", (0, validationMiddleware_1.validateRequest)(authSchema_1.adminLoginSchema), admin_controller_1.adminLogin);
router.post("/signup", (0, validationMiddleware_1.validateRequest)(authSchema_1.adminSignupSchema), admin_controller_1.adminSignup);
// Most recent chat for a student (no auth required)
// Protected routes (require admin auth)
router.use(adminAuthMiddleware_1.default); // Apply admin auth middleware to all routes below
router.post("/logout", admin_controller_1.adminLogout);
router.get("/profile", admin_controller_1.getAdminProfile);
// Dashboard routes
router.get("/stats", admin_controller_1.getDashboardStats);
router.get("/analytics", admin_controller_1.getAnalytics);
// Student management routes
router.get("/students", admin_controller_1.getAllStudents);
// Chat management routes
router.get("/chats", admin_controller_1.getAllChats);
router.get("/flagged", admin_controller_1.getFlaggedContent);
router.patch("/chats/:chatId/flag", admin_controller_1.toggleChatFlag);
// Export routes
router.get("/export", admin_controller_1.exportData);
exports.default = router;
//# sourceMappingURL=admin.route.js.map