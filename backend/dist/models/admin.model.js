"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const adminSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 4
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });
adminSchema.index({ email: 1 });
// Hash password before saving
adminSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    this.password = await bcrypt_1.default.hash(this.password, 12);
    next();
});
// Generate access token method (simple)
adminSchema.methods.generateAccessToken = function () {
    const expiry = process.env.ACCESS_TOKEN_EXPIRY;
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!expiry)
        throw new Error("ACCESS_TOKEN_EXPIRY is not defined");
    if (!secret)
        throw new Error("ACCESS_TOKEN_SECRET is not defined");
    const payload = {
        _id: this._id,
        email: this.email,
        role: 'admin'
    };
    const options = {
        expiresIn: expiry
    };
    return jsonwebtoken_1.default.sign(payload, secret, options);
};
// Password comparison method
adminSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt_1.default.compare(password, this.password);
};
const Admin = (0, mongoose_1.model)('Admin', adminSchema);
exports.default = Admin;
//# sourceMappingURL=admin.model.js.map