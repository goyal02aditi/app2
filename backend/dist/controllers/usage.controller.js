"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUsageLogs = void 0;
const usageLog_model_1 = require("../models/usageLog.model");
const consent_model_1 = require("../models/consent.model");
const saveUsageLogs = async (req, res) => {
    try {
        const logs = req.body;
        const userId = req.user?._id;
        if (!Array.isArray(logs) || logs.length === 0) {
            return res.status(400).json({ error: "No logs provided" });
        }
        const usaageLog = usageLog_model_1.UsageLog.find({
            userId
        });
        // Check consent
        const consent = await consent_model_1.Consent.findOne({ userId });
        if (!consent || !consent.appUsage) {
            return res.status(403).json({ error: "User has not consented to usage tracking" });
        }
        const logsWithUser = logs.map((log) => ({
            ...log,
            userId,
        }));
        await usageLog_model_1.UsageLog.insertMany(logsWithUser);
        res.status(201).json({ message: "Usage logs saved" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to save usage logs" });
    }
};
exports.saveUsageLogs = saveUsageLogs;
//# sourceMappingURL=usage.controller.js.map