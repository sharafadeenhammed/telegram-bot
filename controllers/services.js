import botReply from "../client/botReply.js";
import keyboard from "../utility/keyboard.js"
import UserData from "../utility/UserData.js";
import client, { smsPva } from "../client/client.js";
import User from "../model/User.js";
import * as dataProcessor from "../utility/dataProcessor.js"
import * as smsPvaService from "./smspva.js"
import { CronJob } from "cron";

export const rentOrOneTimeUseKeyboard = async (req, res, next, currentUser) => {
  const userData = new UserData(req);
  const user =  currentUser?.chatId ? currentUser : await User.findOne({ chatId: userData.chatId });
  if (!user) {
    await botReply.noAccountResponse(userData.chatId);
    res.status(200).json({ success: true });
    return;
  }
  const response = await botReply.botResponse({
    chat_id: userData.chatId,
    text: `Do you want to rent or one time use a number ? \n\nNOTE: Before using a number make sure you have selected the correct COUNTRY and SERVICE you are about to use, check your /profile for more details. \n\nSELECTED COUNTRY: ${user.country? user.country : "NONE"} \nSELECTED SERVICE: ${user.service ? user.service : "NONE"} \n\n If this does not match your desired SERVICE and COUNTRY please change them  accordingly before you ONE TIME USE or RENT a number.`,
    reply_markup: keyboard.rentOrOneTimeUse
  });    
  res.status(200).json({ success: true });
  user.lastSentMessageId = response.data.result.message_id; //TODO: last sent message id...
  await user.save();
  
};

export const getOtuNumber = async (req, res, next, currentUser) => {
  const price = await smsPvaService.getOtuPrice(req, res, next);
  // check if price is available or not is available
  if (price.success === false) {
    await botReply.botErrorResponse(req, res, next, "error processing your request please try again");
    res.status(200).json({ success: true});
    return
  }
  console.log("price from smspvs", price.price);
  // parse price.price to float
  price.price = parseFloat(price.price) + 1;

  const userData = new UserData(req);
  const user = currentUser?.chatId ? currentUser : await User.findOne({ chatId: userData.chatId });
  // TODO:check if user has enough balance
  if (price.price > user.balance) {
    await botReply.botErrorResponse(req, res, next, `you don't have enough balance to use this service, fund your wallet with at least ${parseFloat(price.price).toFixed(2)} USDT and try again`);
    res.status(200).json({ success: true });
    return;
  }
    
  const otuNumber = await smsPvaService.getOtuNumber(req, res, next);
  // check if number is available or not
  if (otuNumber.success === false) {
    await botReply.botErrorResponse(req, res, next, "It seems like the service youre trying to use is not available in the country you selected. Please select another country and try again");
    res.status(200).json({ success: true});
    return
  }

  user.otuNumber = `${otuNumber.CountryCode}${otuNumber.number}`;
  user.otuNumberId = otuNumber.id;
  user.otuIssuedAt = new Date();
  user.otuSercicePrice = price.price;
  await user.save();

  await botReply.botResponse({
    chat_id: userData.chatId,
    text: `Your ONE TIME USE number is ${otuNumber.CountryCode}${otuNumber.number} \n\nSELECTED COUNTRY: ${user.country} \nSELECTED SERVICE: ${user.service} \n\nyour wallet will be debited with ${parseFloat(price.price).toFixed(2)} USDT once OTP has been received \n\nif your did not get the OTP messages AUTOMATICALLY please check your profile for RECEIVED OTP messages. \n\n Note: One time use numbers are valid for 10 mins only.`,
    reply_markup: keyboard.mainKeyboard
  });

  // create cron job to get message every 30 minutes
  const now = Date.now();
  const job = new CronJob(
    "*/3 * * * * *",
    async () => {  
      const message = await smsPvaService.getOtuTextMessage(req, res, next);
      console.log("message: ", message.message);
      // console.log("timestamp number nissued: ", now);
      // console.log("now: ", Date.now());
      // console.log("time difference: ", Date.now() - now )
      if (message.success === true) {
        user.otuReceivedSms = message.text;
        user.otuExpired = true;
        user.otuIssuedAt = null;
        user.otuNumber = "";
        user.balance = user.balance - price.price;
        await user.save();
        await botReply.botResponse({
          chat_id: userData.chatId,
          text: `OTP Message received \n\n${message.text}`,
          reply_markup: keyboard.mainKeyboard
        });
        console.log("job stopped succcessful");
        job.stop();
      }
      if (Date.now() - now > 11 * 60 * 1000 || message.response == "3" ) {
        user.otuExpired = true;        
        await user.save();
        
        await botReply.botResponse({
          chat_id: userData.chatId,
          text: `your otu number  ${user.otuNumber} have expired`,
          reply_markup: keyboard.mainKeyboard
        });
        console.log("job stopped not succcessful");
        job.stop();
      }
    },
    null,
    true,
  )

  job.start();

  res.status(200).json({ success: true});  
};


export const rentalOptions = async (req, res, next, currentUser) => {
  const userData = new UserData(req);
  const user = currentUser?.chatId ? currentUser : await User.findOne({ chatId: userData.chatId });
  if (!user) {
    await botReply.noAccountResponse(userData.chatId);
    res.status(200).json({ success: true });
    return;
  }
  const response = await botReply.botResponse({
    chat_id: userData.chatId,
    resize_keyboard: true,
    one_time_keyboard: true,
    reply_markup: keyboard.rentalOptionsKeyboard,
    text: "SELECT RENTAL SERVICE PACKAGE \n\n 1 WEEK or 1 MONTH?",
  });
  user.lastSentMessageId = response.data.result.message_id; //TODO: last sent message id...
  await user.save();
  res.status(200).json({ success: true });
};


// get rental number
export const getRentalNumber = async (req, res, next, currentUser) => {
  const userData = new UserData(req);
  const user = currentUser?.chatId ? currentUser : await User.findOne({ chatId: userData.chatId });
  if (!user) {
    await botReply.noAccountResponse(userData.chatId);
    res.status(200).json({ success: true });
    return;
  }

  // get rental service price
  const price = await smsPvaService.getOtuPrice(req, res, next, currentUser);

  // check price validity with
  console.log("price from smspvs", price.price);

  if (price.success === false) {
    await botReply.botErrorResponse(req, res, next, "error processing your request please try again");
    res.status(200).json({ success: true });
    return;
  }  
  
  // parse price.price to float
  price.price = parseFloat(price.price) + 1;

  // set price according to package selected 
  price.price = userData.message === "week" ? price.price * 7 : price.price * 30;

  if (price.price > user.balance ) {
    await botReply.botErrorResponse(req, res, next, `you don't have enough balance to use this service, fund your wallet with at least ${parseFloat(price.price).toFixed(2)} USDT and try again`);
    res.status(200).json({ success: true });
    return;
  }

  // TODO: get rented number
  const rentalNumber = await smsPvaService.getRentalNumber(req, res, next, currentUser);

  console.log("rented number after api call: ", rentalNumber);
  // check if rented number success
  if (rentalNumber.success === false) {
    await botReply.botErrorResponse(req, res, next, " 🔴 This service is not Available at the moment please try again later 🔴"); 
    res.status(200).json({ success: true });
    return;
  }


  // TODO: activate rented number

  const activateNumber = await smsPvaService.actviveRentedNumber(req, res, next, rentalNumber.data.id);

  console.log("activated number after api call: ", activateNumber);


  // await botReply.botResponse({
  //   chat_id: userData.chatId,
  //   text: `YOUR RENTAL PACKAGE IS ${user.service} \n\nYOUR RENTAL PACKAGE PRICE IS ${price.price}`,
  //   reply_markup: keyboard.mainKeyboard
  // });
  res.status(200).json({ success: true });
  user.rentMode = userData.message;
  user.rentalServicePrice = price.price;
  user.rentedNumberId = rentalNumber.data.id;
  user.rentedNumber = `+${rentalNumber.data.pnumber}`;
  user.rentalServiceValidTill = `${rentalNumber.data.until}000`;
  user.balance = user.balance - price.price;
  await user.save();
};



/*


{
  status: 1,
  data: {
    id: 513684,
    pnumber: '351969179362',
    ccode: '',
    service: 'opt205',
    until: 1720944660
  }
}



*/