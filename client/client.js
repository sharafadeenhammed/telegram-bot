import axios from "axios";
import apisauce from "apisauce";

export default axios.create({
  baseURL: `https://api.telegram.org/bot6165503678:AAHtGzZ5VXdqzc2KEcFka-_GXUgzFtYzu1A`,
});


export const smsPva = apisauce.create({
  baseURL: "https://smspva.com",
})