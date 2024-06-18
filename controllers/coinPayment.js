import User from "../model/User.js"
export const verifyPayment = async (data) => {
 const user = await User.findOne({chatID: data.id}) 
}