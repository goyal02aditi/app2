"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validationMiddleware_1 = require("../middleware/validationMiddleware");
const authSchema_1 = require("../validation/authSchema");
const user_controller_1 = require("../controllers/user.controller");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
router.post("/signup", (0, validationMiddleware_1.validateRequest)(authSchema_1.userSignupSchema), user_controller_1.registerUser);
router.post("/Signin", (0, validationMiddleware_1.validateRequest)(authSchema_1.userLoginSchema), user_controller_1.Signin);
router.post('/logout', authMiddleware_1.default, user_controller_1.logoutUser);
exports.default = router;
//# sourceMappingURL=user.route.js.map