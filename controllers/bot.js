import asyncHAndeler from "express-async-handler";

//@ route  POST api/v1/bot/payload
//@ Access Public
//@ desc receive message payload from bot
const botRequest = asyncHAndeler(async (req, res, next) => {
  console.log(req.body);
});

export default {
  botRequest,
};
