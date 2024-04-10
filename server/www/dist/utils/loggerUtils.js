"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const logger = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.combine(winston_1.default.format.errors({ stack: true }), winston_1.default.format.timestamp(), winston_1.default.format.printf(({ level, message, timestamp, stack }) => {
        if (stack) {
            const errorStack = stack.split("\n");
            const fileName = errorStack[errorStack.length - 1].split("(")[1].split(":")[0];
            const lineNumber = errorStack[errorStack.length - 1].split(":")[1];
            return `${timestamp} [${level}] ${message} (${fileName} : ${lineNumber})`;
        }
        return `${timestamp} [${level}]:  ${message}`;
    })),
    transports: [
        new winston_1.default.transports.Console(),
        new winston_1.default.transports.File({ filename: "logs/app.log" }),
    ],
});
exports.default = logger;
