"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveConsent = exports.getConsent = void 0;
const consent_model_1 = require("../models/consent.model");
const getConsent = async (req, res) => {
    try {
        const userId = req.user?._id;
        const consent = await consent_model_1.Consent.findOne({ userId });
        if (!consent) {
            return res.status(400).json({ hasConsent: false });
        }
        res.status(200).json({ hasConsent: true, consent });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch consent" });
    }
};
exports.getConsent = getConsent;
const saveConsent = async (req, res) => {
    try {
        const user = req.user;
        const { conversationLogs, appUsage, audio } = req.body;
        console.log('saveConsent called. userId:', user?._id, 'body:', req.body);
        const newConsent = await consent_model_1.Consent.create({
            userId: user._id,
            conversationLogs,
            appUsage,
            audio
        });
        console.log('Result from create:', newConsent);
        res.status(200).json({ message: "Consent saved", consent: newConsent });
    }
    catch (err) {
        console.error('Error in saveConsent:', err);
        res.status(500).json({ error: "Failed to save consent" });
    }
};
exports.saveConsent = saveConsent;
//# sourceMappingURL=consent.contoller.js.map