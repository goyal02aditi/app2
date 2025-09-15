"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/Token.ts
const mongoose_1 = __importDefault(require("mongoose"));
const TokenSchema = new mongoose_1.default.Schema({
    token: { type: String, required: true, unique: true },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Token", TokenSchema);
//# sourceMappingURL=token.js.map