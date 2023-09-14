import express from "express";
import morgan from "morgan";

const server = express();
server.use(morgan("dev"));

const PORT = process.env.PORT || 5000;
server.listen();
