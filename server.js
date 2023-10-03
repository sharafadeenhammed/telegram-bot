import express from "express";
import morgan from "morgan";
import dotenv, { config } from "dotenv";

import connectDb from "./db/connectDb.js";
import bot from "./routes/bot.js";
import errorHandeler from "./utility/errorHandeler.js";

dotenv.config();
const server = express();
connectDb(); // connect to database...

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use((req, res, next) => {
  // console.log("resquest data: ", req.body);
  next();
});
server.use(morgan("dev"));

server.use("/api/v1/bot/", bot);

server.use(errorHandeler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("server running on port ", PORT);
});
