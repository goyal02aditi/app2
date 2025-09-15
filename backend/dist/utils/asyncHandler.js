"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = void 0;
const asyncHandler = (func) => {
    return async (req, res, next) => {
        try {
            await func(req, res, next);
        }
        catch (err) {
            const statusCode = err.statusCode || 500;
            res.status(statusCode).json({
                success: false,
                message: err.message || "Internal Server Error",
            });
        }
    };
};
exports.asyncHandler = asyncHandler;
//# sourceMappingURL=asyncHandler.js.map