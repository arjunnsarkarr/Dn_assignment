import express from "express";
import cors from "cors";
import client from "./routes/client_routes";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectDB from "./utils/dbConnection";
import { authorize } from "./middleware/authorize";
import compression from "compression";

// .env configuration
import dotenv from "dotenv";
dotenv.config();

const app = express();
const path = require("path");


// cookie parser and body parser
app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static(path.join(__dirname, "public")));
app.use(compression());



//  cors policy
const domain = process.env.DOMAIN as string;
const allowedOrigins = [domain, "https://" + domain, "http://localhost:3000"];

const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));

// The actual api handle from this "/" 
app.use("/", client);


// db connection and server connection establishment
const PORT = 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`app is listing on port ${PORT}`);
  });
});
