"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const Auth_routes_1 = __importDefault(require("./routes/Auth.routes"));
const handleError_1 = require("./middlewares/handleError");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const SaveRouter_routes_1 = __importDefault(require("./routes/SaveRouter.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)({
    origin: "http://localhost:5174",
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/", Auth_routes_1.default);
app.use("/", SaveRouter_routes_1.default);
app.use(handleError_1.errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
