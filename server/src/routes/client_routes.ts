import { getData, home, update } from "../contrller/client";

var express = require("express");
var router = express.Router();

//   "/" api generally shows that the server is on
router.get("/", home);

//  "/data" Api will Get all data from the database
router.get("/data", getData);

//  "/update" will update the image and count in database
router.post("/update", update);

export default router;
