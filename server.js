import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import fileUpload from "express-fileupload";

import connectDb from "./db/connectDb.js";
import bot from "./routes/bot.js";
import errorHandeler from "./utility/errorHandeler.js";

dotenv.config();
const server = express();
connectDb(); // connect to database...

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(fileUpload());
server.use((req, res, next) => {
  // console.log("resquest data: ", req.body);
  next();
});
server.use(morgan(process.env.MODE === "development" ? "dev" : "common"));

server.use("/api/v1/bot/", bot);

server.get("/status", (req, res, next) => {
  res.status(200).json({ success: true });
})

server.get("/download/:id/:fileName", (req, res, next) => {
  const fileName = path.join("./", "documents", req.params.fileName + ".zip");
  res.download(fileName); // Set disposition and send it.
});

// server.use(errorHandeler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("server running on port ", PORT);
});
