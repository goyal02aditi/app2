"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsageLog = void 0;
const mongoose_1 = require("mongoose");
const UsageLogSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.ObjectId,
        ref: 'User'
    },
    package: { type: String, required: true },
    timeUsed: { type: Number, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
}, { timestamps: true });
exports.UsageLog = (0, mongoose_1.model)("UsageLog", UsageLogSchema);
//# sourceMappingURL=usageLog.model.js.map