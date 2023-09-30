import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
// ngrok http --domain=modest-antelope-merry.ngrok-free.app 80

import bot from "./routes/bot.js";

const server = express();
dotenv.config();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use((req, res, next) => {
  console.log("resquest data: ", req.body);
  console.log("\nresponse data: ", res.data);

  next();
});
server.use(morgan("dev"));

server.use("/api/v1/bot/", bot);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("server running on port ", PORT);
});
