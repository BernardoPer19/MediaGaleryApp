"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = exports.comparePassword = exports.hashedPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const hashedPassword = async (password) => {
    const hash = await bcrypt_1.default.hash(password, 10);
    return hash;
};
exports.hashedPassword = hashedPassword;
const comparePassword = async (plainPassword, hashPassword) => {
    const compare = await bcrypt_1.default.compare(plainPassword, hashPassword);
    return compare;
};
exports.comparePassword = comparePassword;
const createToken = (user) => {
    const token = jsonwebtoken_1.default.sign({
        user: {
            user_id: user.user_id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt, // <-- asegurate que esté bien escrito
        },
    }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return token;
};
exports.createToken = createToken;
