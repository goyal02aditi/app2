"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchema = exports.userSignupSchema = exports.adminLoginSchema = exports.adminSignupSchema = void 0;
const zod_1 = require("zod");
// Admin validation schemas
exports.adminSignupSchema = zod_1.z.object({
    name: zod_1.z.string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be less than 50 characters")
        .trim(),
    email: zod_1.z.string()
        .email("Please provide a valid email address")
        .toLowerCase()
        .trim(),
    password: zod_1.z.string()
        .min(4, "Admin password must be at least 4 characters")
        .max(100, "Password must be less than 100 characters")
});
exports.adminLoginSchema = zod_1.z.object({
    email: zod_1.z.string()
        .email("Please provide a valid email address")
        .toLowerCase()
        .trim(),
    password: zod_1.z.string()
        .min(1, "Password is required")
});
// User validation schemas
exports.userSignupSchema = zod_1.z.object({
    name: zod_1.z.string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be less than 50 characters")
        .trim()
        .optional(),
    enrollment: zod_1.z.string()
        .min(1, "Enrollment number is required")
        .trim(),
    batch: zod_1.z.string()
        .min(1, "Batch is required")
        .trim(),
    course: zod_1.z.string()
        .min(1, "Course is required")
        .trim(),
    country: zod_1.z.string()
        .trim()
        .optional(),
    email: zod_1.z.string()
        .email("Please provide a valid email address")
        .toLowerCase()
        .trim(),
    password: zod_1.z.string()
        .min(6, "User password must be at least 6 characters")
        .max(100, "Password must be less than 100 characters")
});
exports.userLoginSchema = zod_1.z.object({
    email: zod_1.z.string()
        .email("Please provide a valid email address")
        .toLowerCase()
        .trim(),
    password: zod_1.z.string()
        .min(1, "Password is required")
});
//# sourceMappingURL=authSchema.js.map