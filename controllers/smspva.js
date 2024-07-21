import UserData from "../utility/UserData.js";
import User from "../model/User.js";
import { smsPva } from "../client/client.js";
import * as dataProcessor from "../utility/dataProcessor.js";
import users from "./user.js"

export const getOtuPrice = async (req, res, next, currentUser) => {
  const userData = new UserData(req);
  const user = currentUser?.chatId ? currentUser : await User.findOne({ chatId: userData.chatId });
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

export const getOtuNumber = async (req, res, next, currentUser) => {
  const userData = new UserData(req);
  const user = currentUser?.chatId ? currentUser : await User.findOne({ chatId: userData.chatId });
  if(!user) return { success: false }
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

export const getOtuTextMessage = async (req, res, next, currentUser) => {
  const userData = new UserData(req);
  const user = currentUser?.chatId ? currentUser : await User.findOne({ chatId: userData.chatId });
  const country = dataProcessor.getCountryByCountryName(user.country)
  const service = dataProcessor.getServiceByServiceName(user.service)
  try {
    const resData = await smsPva.get(`/priemnik.php?metod=get_sms&service=${service.code}&country=${country.countryCode}&apikey=${process.env.SMS_PVA_API_KEY}&id=${user.otuNumberId}`)
    if(resData.data.response === "1") return { success: true, ...resData.data };
    return { success: false, ...resData.data };
  } catch (error) {
    return { success: false }
  }
}

// export const getRentalPrice = async (req, res, next, currentUser) => {
//   const userData = new UserData(req);
//   const user = currentUser?.chatId ? currentUser : await User.findOne({ chatId: userData.chatId });
//   const country = dataProcessor.getCountryByCountryName(user.country)
//   const service = dataProcessor.getServiceByServiceName(user.service)
//   try {
//     const resData = await smsPva.get(`/api/rent.php?method=create&service=${service.code}&country=${country.countryCode}&apikey=${process.env.SMS_PVA_API_KEY}&dtype=${userData.message}dcount=1`)
//     if (resData.data.response === "1") return { success: true, ...resData.data };
//     throw new Error("error processing your request please try again");
//   } catch (error) {
//     return { success: false }
//   }
// }

export const getRentalNumber = async (req, res, next, currentUser) => {
  const userData = new UserData(req);
  const user = currentUser?.chatId ? currentUser : await User.findOne({ chatId: userData.chatId });
  if(!user) return { success: false }
  const country = dataProcessor.getCountryByCountryName(user.country)
  const service = dataProcessor.getServiceByServiceName(user.service)

  // check if service is available for rental...
  if (!service?.newCode) return { success: false, message: `Sorry ${service.name} is not Available for rental service use (one time use) instead` }
  try {
    const resData = await smsPva.get(`/api/rent.php?method=create&service=${service.newCode}&country=${country.countryCode}&apikey=${process.env.SMS_PVA_API_KEY}&dtype=${userData.message}&dcount=1`)
    console.log("rented number from api call: ", resData.data);
    if (resData.data.status == "1") return { success: true, ...resData.data };
    throw resData.data;
  } catch (error) {
    if(error.msg === "Balance is not enough") users.alertAdmin("warning", "🔴 Dear admin smspva balance is too low, please fund smspva as soon as possible for users are  aunable to use our bot services... 🔴")
    return { success: false, message:" 🔴 This service is not Available at the moment please try again later 🔴" }
  }
}

export const actviveRentedNumber = async (req, res, next, id) => {
  try {
    const resData = await smsPva.get(`/api/rent.php?method=activate&apikey=${process.env.SMS_PVA_API_KEY}&id=${id}`)
    console.log("active rental number from api call: ", resData.data);
    if (resData.data.status == "1") return { success: true, ...resData.data };
    throw new Error("error processing your request please try again");
  } catch (error) {
    return { success: false }
  }
}

export const getRentalMessages = async (req, res, next, currentUser) => {
  const userData = new UserData(req);
  const user = currentUser?.chatId ? currentUser : await User.findOne({ chatId: userData.chatId });
  if(!user) return { success: false }
  try {
    const resData = await smsPva.get(`/api/rent.php?method=sms&apikey=${process.env.SMS_PVA_API_KEY}&id=${user.rentedNumberId}`);
    console.log("rented messages: ", resData.data);
    if (resData.data.status == "1") return { success: true, ...resData.data };
    throw new Error("error processing your request please try again");
  } catch (error) {
    return { success: false }
  }
} 