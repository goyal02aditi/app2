"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notificaton_controller_1 = require("../controllers/notificaton.controller");
const router = (0, express_1.Router)();
router.post("/", notificaton_controller_1.notifications);
exports.default = router;
//# sourceMappingURL=notification.route.js.map