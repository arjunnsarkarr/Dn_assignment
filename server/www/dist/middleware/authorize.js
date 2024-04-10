"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const loggerUtils_1 = __importDefault(require("../utils/loggerUtils"));
dotenv_1.default.config();
const authorize = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authToken = req.headers.authorization;
        const token = (authToken === null || authToken === void 0 ? void 0 : authToken.split(" ")[1])
            ? (authToken === null || authToken === void 0 ? void 0 : authToken.split(" ")[1]) : (authToken === null || authToken === void 0 ? void 0 : authToken.split(" ")[0]);
        if (!token || token !== process.env.AUTH_TOKEN) {
            return res.status(401).json({ status: 401, message: "Not Authorize" });
        }
        next();
    }
    catch (error) {
        res.status(500);
        error instanceof Error
            ? loggerUtils_1.default.error(error.message, { stack: error.stack })
            : loggerUtils_1.default.error(error);
    }
});
exports.authorize = authorize;
