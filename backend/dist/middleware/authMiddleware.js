"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const Apierror_1 = require("../utils/Apierror");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtVerification = async (req, res, next) => {
    try {
        // Try to get token from cookies first, then from Authorization header
        let token = req.cookies?.accessToken;
        if (!token) {
            const authHeader = req.headers["authorization"] || req.headers["Authorization"];
            if (authHeader && typeof authHeader === 'string') {
                if (authHeader.startsWith('Bearer ')) {
                    token = authHeader.substring(7);
                }
                else {
                    token = authHeader;
                }
            }
        }
        if (!token) {
            throw new Apierror_1.ApiError(403, "Unauthorized request - no token provided");
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await user_model_1.default.findById(decodedToken?._id);
        if (!user) {
            throw new Apierror_1.ApiError(401, "Invalid access token - user not found");
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error("JWT verification failed:", error.message);
        throw new Apierror_1.ApiError(401, "Invalid access token");
    }
};
exports.default = jwtVerification;
//# sourceMappingURL=authMiddleware.js.map