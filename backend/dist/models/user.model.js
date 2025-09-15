"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    enrollment: {
        type: String,
        required: true,
    },
    batch: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    country: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    refreshToken: {
        type: String,
        required: false,
    },
}, { timestamps: true });
// Pre-save hook for password hashing
userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    this.password = await bcrypt_1.default.hash(this.password, 10);
    next();
});
// Generate Access Token
userSchema.methods.generateAccessToken = function () {
    const expiry = process.env.ACCESS_TOKEN_EXPIRY;
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!expiry)
        throw new Error("ACCESS_TOKEN_EXPIRY is not defined");
    if (!secret)
        throw new Error("ACCESS_TOKEN_SECRET is not defined");
    const payload = {
        _id: this._id,
        email: this.email,
    };
    const options = {
        expiresIn: expiry,
    };
    return jsonwebtoken_1.default.sign(payload, secret, options);
};
// Compare Password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt_1.default.compare(password, this.password);
};
// Generate Refresh Token
userSchema.methods.generateRefreshToken = function () {
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const expiry = process.env.REFRESH_TOKEN_EXPIRY;
    if (!secret)
        throw new Error("REFRESH_TOKEN_SECRET is not defined");
    if (!expiry)
        throw new Error("REFRESH_TOKEN_EXPIRY is not defined");
    const payload = {
        id: this._id,
    };
    const options = {
        expiresIn: expiry,
    };
    return jsonwebtoken_1.default.sign(payload, secret, options);
};
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
//# sourceMappingURL=user.model.js.map