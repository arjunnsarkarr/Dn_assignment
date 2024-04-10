"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_routes_1 = __importDefault(require("./routes/client_routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dbConnection_1 = __importDefault(require("./utils/dbConnection"));
const compression_1 = __importDefault(require("compression"));
// .env configuration
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const path = require("path");
// cookie parser and body parser
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json({ limit: "10mb" }));
app.use(body_parser_1.default.urlencoded({ extended: true, limit: "10mb" }));
app.use(express_1.default.static(path.join(__dirname, "public")));
app.use((0, compression_1.default)());
//  cors policy
const domain = process.env.DOMAIN;
const allowedOrigins = [domain, "https://" + domain, "http://localhost:3000"];
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};
app.use((0, cors_1.default)(corsOptions));
// The actual api handle from this "/" 
app.use("/", client_routes_1.default);
// db connection and server connection establishment
const PORT = 5000;
(0, dbConnection_1.default)().then(() => {
    app.listen(PORT, () => {
        console.log(`app is listing on port ${PORT}`);
    });
});
