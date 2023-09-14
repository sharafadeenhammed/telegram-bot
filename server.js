import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

const server = express();
dotenv.config();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(morgan("dev"));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("server running on port ", PORT);
});
