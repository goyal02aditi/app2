"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consent = void 0;
const mongoose_1 = require("mongoose");
const ConsentSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.ObjectId,
        ref: 'User'
    },
    conversationLogs: { type: Boolean, default: true },
    appUsage: { type: Boolean, default: true },
    audio: { type: Boolean, default: false },
    consentGivenAt: { type: Date, default: Date.now },
});
exports.Consent = (0, mongoose_1.model)("Consent", ConsentSchema);
//# sourceMappingURL=consent.model.js.map