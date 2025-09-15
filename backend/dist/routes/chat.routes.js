"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_controller_1 = require("../controllers/chat.controller");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
// ==========================================
// CHAT CREATION & STARTING ROUTES
// ==========================================
/**
 * @route   POST /api/chat/start
 * @desc    Start a new chat with first message (ChatGPT-like)
 * @access  Private (requires authentication)
 * @body    { message: string }
 */
router.post("/start", authMiddleware_1.default, chat_controller_1.startChatWithMessage);
// ==========================================
// CHAT RETRIEVAL ROUTES
// ==========================================
/**
 * @route   GET /api/chat/user-chats
 * @desc    Get all active chats for the logged-in user with pagination
 * @access  Private (requires authentication)
 * @query   page?: number, limit?: number
 */
router.get("/user-chats", authMiddleware_1.default, chat_controller_1.getUserChats);
/**
 * @route   GET /api/chat/recent
 * @desc    Get the most recently updated active chat
 * @access  Private (requires authentication)
 */
router.get("/recent", authMiddleware_1.default, chat_controller_1.getMostRecentChat);
/**
 * @route   GET /api/chat/:chatId
 * @desc    Get a specific chat with all messages
 * @access  Private (requires authentication)
 * @params  chatId: string (MongoDB ObjectId)
 */
router.get("/:chatId", authMiddleware_1.default, chat_controller_1.getChatById);
// ==========================================
// CHAT MESSAGING ROUTES
// ==========================================
/**
 * @route   POST /api/chat/:chatId/message
 * @desc    Add a new message to an existing chat
 * @access  Private (requires authentication)
 * @params  chatId: string (MongoDB ObjectId)
 * @body    { message: string, role: 'user' }
 */
router.post("/:chatId/message", authMiddleware_1.default, chat_controller_1.addMessage);
/**
 * @route   POST /api/chat/:chatId/send
 * @desc    Send message and get AI response (ChatGPT-like experience)
 * @access  Private (requires authentication)
 * @params  chatId: string (MongoDB ObjectId)
 * @body    { message: string }
 */
router.post("/:chatId/send", authMiddleware_1.default, chat_controller_1.sendMessageWithAI);
/**
 * @route   DELETE /api/chat/:chatId/message/:messageId
 * @desc    Delete a specific message (only within 15-minute window)
 * @access  Private (requires authentication)
 * @params  chatId: string, messageId: string
 */
router.delete("/:chatId/message/:messageId", authMiddleware_1.default, chat_controller_1.deleteMessage);
// ==========================================
// CHAT MANAGEMENT ROUTES
// ==========================================
/**
 * @route   POST /api/chat/:chatId/active
 * @desc    Mark a chat as currently active (for UI state management)
 * @access  Private (requires authentication)
 * @params  chatId: string (MongoDB ObjectId)
 */
router.post("/:chatId/active", authMiddleware_1.default, chat_controller_1.setActiveChat);
// ==========================================
// DELETION & TIME-RESTRICTION ROUTES
// ==========================================
/**
 * @route   DELETE /api/chat/:chatId
 * @desc    Delete a chat (only within 15-minute window)
 * @access  Private (requires authentication)
 * @params  chatId: string (MongoDB ObjectId)
 */
router.delete("/:chatId", authMiddleware_1.default, chat_controller_1.deleteChat);
// ==========================================
// ARCHIVE MANAGEMENT ROUTES
// ==========================================
/**
 * @route   POST /api/chat/:chatId/archive
 * @desc    Manually archive a chat (different from delete)
 * @access  Private (requires authentication)
 * @params  chatId: string (MongoDB ObjectId)
 * @body    { reason?: string }
 */
router.post("/:chatId/archive", authMiddleware_1.default, chat_controller_1.archiveChat);
/**
 * @route   POST /api/chat/:chatId/restore
 * @desc    Restore an archived chat back to active status
 * @access  Private (requires authentication)
 * @params  chatId: string (MongoDB ObjectId)
 */
router.post("/:chatId/restore", authMiddleware_1.default, chat_controller_1.restoreChat);
/**
 * @route   POST /api/chat/auto-archive
 * @desc    Auto-archive old chats (typically called by cron job or admin)
 * @access  Private (requires authentication)
 * @query   days?: number (default: 30 days)
 */
router.post("/auto-archive", authMiddleware_1.default, chat_controller_1.autoArchiveOldChats);
exports.default = router;
//# sourceMappingURL=chat.routes.js.map