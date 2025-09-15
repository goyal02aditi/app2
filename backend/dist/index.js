"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./.env" });
const app_js_1 = __importDefault(require("./app.js"));
const index_js_1 = require("./db/index.js");
(0, index_js_1.connectDb)().then(() => {
    console.log("Database successfully conected");
    app_js_1.default.listen(8000, () => {
        console.log('Server is running at port 8000');
    });
}).catch((errors) => {
    console.log("Failed while connecting to dB", errors);
    process.exit(1);
});
//# sourceMappingURL=index.js.map