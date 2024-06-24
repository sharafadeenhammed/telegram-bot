import UserData from "../utility/UserData.js";
import User from "../model/User.js";
import { smsPva } from "../client/client.js";
import * as dataProcessor from "../utility/dataProcessor.js"


export const getOtuPrice = async (req, res, next) => {
  const userData = new UserData(req);
  const user = await User.findOne({ chatId: userData.chatId });
  const country = dataProcessor.getCountryByCountryName(user.country)
  const service = dataProcessor.getServiceByServiceName(user.service)
  try {
    const resData = await smsPva.get(`/priemnik.php?metod=get_service_price&service=${service.code}&country=${country.countryCode}&apikey=${process.env.SMS_PVA_API_KEY}`)
    if (resData.data.response === "1") return { success: true, ...resData.data };
    throw new Error("error processing your request please try again");
  } catch (error) {
    return { success: false }
  }
}

export const getOtuNumber = async (req, res, next) => {
  const userData = new UserData(req);
  const user = await User.findOne({ chatId: userData.chatId });
  const country = dataProcessor.getCountryByCountryName(user.country)
  const service = dataProcessor.getServiceByServiceName(user.service)
  try {
    const resData = await smsPva.get(`/priemnik.php?metod=get_number&service=${service.code}&country=${country.countryCode}&apikey=${process.env.SMS_PVA_API_KEY}`)
    if (resData.data.response === "1") return { success: true, ...resData.data };
    throw new Error("error processing your request please try again");
  } catch (error) {
    return { success: false }
  }
}

export const getOtuTextMessage = async (req, res, next) => {
  const userData = new UserData(req);
  const user = await User.findOne({ chatId: userData.chatId });
  const country = dataProcessor.getCountryByCountryName(user.country)
  const service = dataProcessor.getServiceByServiceName(user.service)
  try {
    const resData = await smsPva.get(`/priemnik.php?metod=get_text_message&service=${service.code}&country=${country.countryCode}&apikey=${process.env.SMS_PVA_API_KEY}`)
    return { success: true, ...resData.data };
  } catch (error) {
    return { success: false }
  }
}