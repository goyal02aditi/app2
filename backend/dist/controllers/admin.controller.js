"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleChatFlag = exports.getFlaggedContent = exports.exportData = exports.getAnalytics = exports.getAllChats = exports.getAllStudents = exports.getDashboardStats = exports.getAdminProfile = exports.adminLogout = exports.adminSignup = exports.adminLogin = void 0;
const admin_model_1 = __importDefault(require("../models/admin.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const chat_model_1 = __importDefault(require("../models/chat.model"));
const usageLog_model_1 = require("../models/usageLog.model");
const asyncHandler_1 = require("../utils/asyncHandler");
const Apierror_1 = require("../utils/Apierror");
const XLSX = __importStar(require("xlsx"));
// Admin Login
exports.adminLogin = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new Apierror_1.ApiError(400, "Email and password are required");
    }
    // Find admin by email
    const admin = await admin_model_1.default.findOne({ email: email.toLowerCase() });
    if (!admin) {
        throw new Apierror_1.ApiError(401, "Invalid credentials");
    }
    // Check if admin is active
    if (!admin.isActive) {
        throw new Apierror_1.ApiError(401, "Admin account is deactivated");
    }
    // Verify password
    const isPasswordValid = await admin.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new Apierror_1.ApiError(401, "Invalid credentials");
    }
    // Generate access token
    const accessToken = admin.generateAccessToken();
    // Remove password from response
    const adminData = {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        isActive: admin.isActive,
        createdAt: admin.createdAt
    };
    res.status(200).json({
        success: true,
        message: "Admin logged in successfully",
        data: {
            admin: adminData,
            accessToken
        }
    });
});
// Admin Signup
exports.adminSignup = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { name, email, password } = req.body;
    // Check if admin already exists
    const existingAdmin = await admin_model_1.default.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
        throw new Apierror_1.ApiError(409, "Admin with this email already exists");
    }
    // Create new admin
    const admin = await admin_model_1.default.create({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password,
        isActive: true
    });
    // Generate access token
    const accessToken = admin.generateAccessToken();
    // Remove password from response
    const adminData = {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        isActive: admin.isActive,
        createdAt: admin.createdAt
    };
    res.status(201).json({
        success: true,
        message: "Admin account created successfully",
        data: {
            admin: adminData,
            accessToken
        }
    });
});
// Admin Logout
exports.adminLogout = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Admin logged out successfully"
    });
});
// Get Admin Profile
exports.getAdminProfile = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const admin = await admin_model_1.default.findById(req.admin._id).select("-password");
    if (!admin) {
        throw new Apierror_1.ApiError(404, "Admin not found");
    }
    res.status(200).json({
        success: true,
        data: admin
    });
});
// Get Dashboard Stats/KPIs
exports.getDashboardStats = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    try {
        // Get total users count
        const totalUsers = await user_model_1.default.countDocuments();
        // Get active chats (chats from last 24 hours)
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const activeChats = await chat_model_1.default.countDocuments({
            createdAt: { $gte: yesterday },
            isActive: true
        });
        // Get total chats
        const totalChats = await chat_model_1.default.countDocuments({
            isActive: true
        });
        // Get flagged content count (assuming we have a flagged field)
        const flaggedContent = await chat_model_1.default.countDocuments({
            flagged: true,
            isActive: true
        });
        // Calculate average response time (mock data for now)
        const avgResponseTime = "2.3s";
        // Get recent activity (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const dailyStats = await chat_model_1.default.aggregate([
            {
                $match: {
                    createdAt: { $gte: sevenDaysAgo },
                    isActive: true
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        res.status(200).json({
            success: true,
            data: {
                kpis: {
                    totalUsers,
                    activeChats,
                    totalChats,
                    flaggedContent,
                    avgResponseTime
                },
                chartData: dailyStats,
                lastUpdated: new Date()
            }
        });
    }
    catch (error) {
        throw new Apierror_1.ApiError(500, "Error fetching dashboard stats");
    }
});
// Get All Students
exports.getAllStudents = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { page = 1, limit = 10, search = "" } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    // Build search query
    const searchQuery = search
        ? {
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ]
        }
        : {};
    // Get users with chat count and most recent chat
    const students = await user_model_1.default.aggregate([
        { $match: searchQuery },
        {
            $lookup: {
                from: 'chats',
                let: { userId: '$_id' },
                pipeline: [
                    { $match: { $expr: { $and: [{ $eq: ['$userId', '$$userId'] }, { $ne: ['$status', 'user-deleted'] }] } } },
                    { $sort: { createdAt: -1 } },
                ],
                as: 'chats',
            }
        },
        {
            $addFields: {
                chatCount: { $size: '$chats' },
                lastActivity: { $max: '$chats.createdAt' },
                recentChat: {
                    $cond: [
                        { $gt: [{ $size: '$chats' }, 0] },
                        {
                            $let: {
                                vars: { rc: { $arrayElemAt: ['$chats', 0] } },
                                in: {
                                    chatId: '$$rc._id',
                                    createdAt: '$$rc.createdAt',
                                    title: { $ifNull: ['$$rc.title', ''] },
                                    firstMessage: {
                                        $cond: [
                                            { $gt: [{ $size: '$$rc.messages' }, 0] },
                                            { $arrayElemAt: ['$$rc.messages.content', 0] },
                                            ''
                                        ]
                                    }
                                }
                            }
                        },
                        null
                    ]
                }
            }
        },
        {
            $project: {
                password: 0,
                chats: 0,
                isActive: 1,
                course: 1
            }
        },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limitNum }
    ]);
    const totalStudents = await user_model_1.default.countDocuments(searchQuery);
    res.status(200).json({
        success: true,
        data: {
            students,
            pagination: {
                currentPage: pageNum,
                totalPages: Math.ceil(totalStudents / limitNum),
                totalStudents,
                hasNext: pageNum * limitNum < totalStudents,
                hasPrev: pageNum > 1
            }
        }
    });
});
// Get All Chats
exports.getAllChats = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { page = 1, limit = 10, userId, flagged } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    // Build filter query
    const filterQuery = { status: { $ne: 'user-deleted' } };
    if (userId) {
        filterQuery.userId = userId;
    }
    if (flagged === 'true') {
        filterQuery.flagged = true;
    }
    const chats = await chat_model_1.default.find(filterQuery)
        .populate('userId', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum);
    const totalChats = await chat_model_1.default.countDocuments(filterQuery);
    res.status(200).json({
        success: true,
        data: {
            chats,
            pagination: {
                currentPage: pageNum,
                totalPages: Math.ceil(totalChats / limitNum),
                totalChats,
                hasNext: pageNum * limitNum < totalChats,
                hasPrev: pageNum > 1
            }
        }
    });
});
// Get Analytics Data
exports.getAnalytics = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { period = '7d' } = req.query;
    let startDate = new Date();
    switch (period) {
        case '24h':
            startDate.setHours(startDate.getHours() - 24);
            break;
        case '7d':
            startDate.setDate(startDate.getDate() - 7);
            break;
        case '30d':
            startDate.setDate(startDate.getDate() - 30);
            break;
        default:
            startDate.setDate(startDate.getDate() - 7);
    }
    // Chat trends over time
    const chatTrends = await chat_model_1.default.aggregate([
        {
            $match: {
                createdAt: { $gte: startDate },
                status: { $ne: 'user-deleted' }
            }
        },
        {
            $group: {
                _id: {
                    $dateToString: {
                        format: period === '24h' ? "%H:00" : "%Y-%m-%d",
                        date: "$createdAt"
                    }
                },
                count: { $sum: 1 }
            }
        },
        { $sort: { _id: 1 } }
    ]);
    // Top users by chat count
    const topUsers = await chat_model_1.default.aggregate([
        {
            $match: {
                createdAt: { $gte: startDate },
                status: { $ne: 'user-deleted' }
            }
        },
        {
            $group: {
                _id: '$userId',
                chatCount: { $sum: 1 }
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unwind: '$user'
        },
        {
            $project: {
                name: '$user.name',
                email: '$user.email',
                chatCount: 1
            }
        },
        { $sort: { chatCount: -1 } },
        { $limit: 10 }
    ]);
    res.status(200).json({
        success: true,
        data: {
            period,
            chatTrends,
            topUsers,
            generatedAt: new Date()
        }
    });
});
// Export Data to Excel
exports.exportData = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { type = 'all', format = 'xlsx' } = req.query;
    try {
        let data = {};
        // Get all students
        const students = await user_model_1.default.find().lean();
        // Get all chats with user and messages
        const chats = await chat_model_1.default.find({ status: { $ne: 'user-deleted' } })
            .populate('userId', 'name email batch course country')
            .select('messages createdAt updatedAt flagged flagReason userId')
            .lean();
        // Get all usage logs - only include user ID without populating
        const usageLogs = await usageLog_model_1.UsageLog.find().lean();
        // Build Students sheet
        // ---------- Students ----------
        const studentsSheet = students.map((u) => ({
            UserID: u._id.toString() || "",
            Batch: u.batch || "",
            Course: u.course || "",
            Country: u.country || "",
            ChatCount: chats.filter((c) => c.userId &&
                typeof c.userId === "object" &&
                c.userId._id.equals(u._id)).length,
            LastActivity: (() => {
                const userChats = chats.filter((c) => c.userId &&
                    typeof c.userId === "object" &&
                    c.userId._id.equals(u._id));
                if (!userChats.length)
                    return "";
                return new Date(Math.max(...userChats.map((c) => new Date(c.updatedAt).getTime()))).toLocaleString();
            })(),
            CreatedAt: u.createdAt ? new Date(u.createdAt).toLocaleString() : "",
        }));
        // ---------- Chats ----------
        const chatsSheet = chats.map((c) => {
            let userId = "";
            if (c.userId && typeof c.userId === "object" && c.userId !== null) {
                if ("_id" in c.userId) {
                    userId = c.userId._id.toString() || "";
                }
            }
            return {
                ChatID: c._id?.toString() || "",
                UserID: userId,
                MessageCount: c.messages?.length || 0,
                Flagged: c.flagged ? "true" : "false",
                FlagReason: c.flagReason || "",
                CreatedAt: c.createdAt
                    ? new Date(c.createdAt).toLocaleString()
                    : "",
                UpdatedAt: c.updatedAt
                    ? new Date(c.updatedAt).toLocaleString()
                    : "",
            };
        });
        // Build Messages sheet
        let messagesSheet = [];
        chats.forEach((c) => {
            if (Array.isArray(c.messages)) {
                c.messages.forEach((m, idx) => {
                    messagesSheet.push({
                        MessageID: m._id?.toString() || `${c._id}-${idx}`,
                        ChatID: c._id?.toString() || '',
                        Sender: m.role === 'user' ? 'User' : 'AI',
                        Content: m.content || '',
                        Timestamp: m.timestamp ? new Date(m.timestamp).toLocaleString() : ''
                    });
                });
            }
        });
        // Build Usage Logs sheet
        const usageLogsSheet = usageLogs.map((log) => {
            return {
                LogID: log._id?.toString() || "",
                UserID: log.userId?.toString() || "",
                Package: log.package || "",
                TimeUsed: log.timeUsed || 0,
                StartTime: log.startTime ? new Date(log.startTime).toLocaleString() : "",
                EndTime: log.endTime ? new Date(log.endTime).toLocaleString() : "",
                CreatedAt: log.createdAt ? new Date(log.createdAt).toLocaleString() : "",
            };
        });
        if (format === 'xlsx') {
            // Create Excel workbook
            const workbook = XLSX.utils.book_new();
            // Add Students sheet
            const studentsWS = XLSX.utils.json_to_sheet(studentsSheet);
            XLSX.utils.book_append_sheet(workbook, studentsWS, "Students");
            // Add Chats sheet
            const chatsWS = XLSX.utils.json_to_sheet(chatsSheet);
            XLSX.utils.book_append_sheet(workbook, chatsWS, "Chats");
            // Add Messages sheet
            const messagesWS = XLSX.utils.json_to_sheet(messagesSheet);
            XLSX.utils.book_append_sheet(workbook, messagesWS, "Messages");
            // Add Usage Logs sheet
            const usageLogsWS = XLSX.utils.json_to_sheet(usageLogsSheet);
            XLSX.utils.book_append_sheet(workbook, usageLogsWS, "Usage Logs");
            // Generate buffer
            const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
            // Set headers for file download
            const fileName = `chat-app-export-${new Date().toISOString().split('T')[0]}.xlsx`;
            res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.send(buffer);
        }
        else {
            // Return JSON format
            res.status(200).json({
                success: true,
                data: {
                    students: studentsSheet,
                    chats: chatsSheet,
                    messages: messagesSheet,
                    usageLogs: usageLogsSheet
                },
                exportedAt: new Date()
            });
        }
    }
    catch (error) {
        throw new Apierror_1.ApiError(500, "Error exporting data");
    }
});
// Get Flagged Content
exports.getFlaggedContent = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    const flaggedChats = await chat_model_1.default.find({
        flagged: true,
        status: { $ne: 'user-deleted' }
    })
        .populate('userId', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum);
    const totalFlagged = await chat_model_1.default.countDocuments({
        flagged: true,
        status: { $ne: 'user-deleted' }
    });
    res.status(200).json({
        success: true,
        data: {
            flaggedChats,
            pagination: {
                currentPage: pageNum,
                totalPages: Math.ceil(totalFlagged / limitNum),
                totalFlagged,
                hasNext: pageNum * limitNum < totalFlagged,
                hasPrev: pageNum > 1
            }
        }
    });
});
// Toggle Flag on Chat
exports.toggleChatFlag = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { chatId } = req.params;
    const { flagged, reason } = req.body;
    const chat = await chat_model_1.default.findById(chatId);
    if (!chat) {
        throw new Apierror_1.ApiError(404, "Chat not found");
    }
    chat.flagged = flagged;
    if (reason) {
        chat.flagReason = reason;
    }
    await chat.save();
    res.status(200).json({
        success: true,
        message: `Chat ${flagged ? 'flagged' : 'unflagged'} successfully`,
        data: chat
    });
});
//# sourceMappingURL=admin.controller.js.map