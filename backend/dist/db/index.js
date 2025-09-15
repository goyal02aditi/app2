"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "../.env" });
const connectDb = () => {
    const uri = process.env.MONGODB_URI;
    if (!uri)
        throw new Error("Missing URI");
    return mongoose_1.default.connect(uri);
};
exports.connectDb = connectDb;
//# sourceMappingURL=index.js.map