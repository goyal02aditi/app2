"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const consent_contoller_1 = require("../controllers/consent.contoller");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
router.post("/", authMiddleware_1.default, consent_contoller_1.saveConsent);
router.get("/", authMiddleware_1.default, consent_contoller_1.getConsent);
exports.default = router;
//# sourceMappingURL=consent.routes.js.map