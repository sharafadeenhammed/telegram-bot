import axios from "axios";
import apisauce from "apisauce";
import dotenv from "dotenv";
dotenv.config();

export default axios.create({
  baseURL: `https://api.telegram.org/${process.env.BOT_TOKEN}`,
});


export const smsPva = apisauce.create({
  baseURL: "https://smspva.com",
})