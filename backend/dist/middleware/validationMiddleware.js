"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserLogin = exports.validateUserSignup = exports.validateAdminLogin = exports.validateAdminSignup = exports.validateRequest = void 0;
const zod_1 = require("zod");
const Apierror_1 = require("../utils/Apierror");
// Generic validation middleware
const validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            // Validate the request body
            const validatedData = schema.parse(req.body);
            // Replace req.body with validated and sanitized data
            req.body = validatedData;
            next();
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                // Extract validation errors
                const errorMessages = error.issues.map((err) => `${err.path.join('.')}: ${err.message}`);
                throw new Apierror_1.ApiError(400, "Validation failed", errorMessages);
            }
            // If it's not a Zod error, pass it along
            next(error);
        }
    };
};
exports.validateRequest = validateRequest;
// Specific validation middlewares for different endpoints
exports.validateAdminSignup = exports.validateRequest;
exports.validateAdminLogin = exports.validateRequest;
exports.validateUserSignup = exports.validateRequest;
exports.validateUserLogin = exports.validateRequest;
//# sourceMappingURL=validationMiddleware.js.map