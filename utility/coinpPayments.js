import coinpayments from "coinpayments" //("coinpayments").default
import dotenv from "dotenv";
dotenv.config();

const client = new coinpayments({
  key: process.env.COINPAYMENT_KEY,
  secret: process.env.COINPAYMENT_SECRET
})


export async function getAddress(coinType = "USDT", chatId) {
  try {
    const response = await client.getCallbackAddress({ label:chatId , currency: coinType, ipn_url: `${process.env.APP_DOMAIN}/payment/confirm` });
    const data = {
      success: true,
      coin:coinType,
      ...response,
    };
    return data;
  } catch (error) {
    return {
      success: false,
      message: "something went wrong try again after sometime",
    }
  }
}

