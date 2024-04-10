import e from "express";
import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp, stack }) => {
      if (stack) {
        const errorStack = stack.split("\n");
        const fileName = errorStack[errorStack.length -1].split("(")[1].split(":")[0];
        const lineNumber = errorStack[errorStack.length - 1].split(":")[1];

        return `${timestamp} [${level}] ${message} (${fileName} : ${lineNumber})`;
      }
      return `${timestamp} [${level}]:  ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/app.log" }),
  ],
});

export default logger;
