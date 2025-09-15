"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_model_1 = __importDefault(require("../models/admin.model"));
const Apierror_1 = require("../utils/Apierror");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminAuthMiddleware = async (req, res, next) => {
    try {
        // Try to get token from cookies first, then from Authorization header
        let token = req.cookies?.accessToken;
        if (!token) {
            const authHeader = req.headers["authorization"] || req.headers["Authorization"];
            if (authHeader && typeof authHeader === 'string') {
                // Handle "Bearer <token>" format
                if (authHeader.startsWith('Bearer ')) {
                    token = authHeader.substring(7);
                }
                else {
                    // Handle direct token
                    token = authHeader;
                }
            }
        }
        if (!token) {
            throw new Apierror_1.ApiError(403, "Unauthorized request - no token provided");
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // Check if the token is for admin role
        if (decodedToken.role !== 'admin') {
            throw new Apierror_1.ApiError(403, "Access denied - Admin privileges required");
        }
        const admin = await admin_model_1.default.findById(decodedToken?._id);
        if (!admin) {
            throw new Apierror_1.ApiError(401, "Invalid access token - admin not found");
        }
        if (!admin.isActive) {
            throw new Apierror_1.ApiError(403, "Admin account is deactivated");
        }
        req.admin = admin;
        next();
    }
    catch (error) {
        console.error("Admin JWT verification failed:", error.message);
        throw new Apierror_1.ApiError(401, "Invalid access token");
    }
};
exports.default = adminAuthMiddleware;
//# sourceMappingURL=adminAuthMiddleware.js.map