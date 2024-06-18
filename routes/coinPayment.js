import express from "express"
import {verifyPayment} from "../controllers/coinPayment.js"

const route = express.Router();


route.post("/verify-payments", (req, res, next) => {
  // TODO: verify user payment...

  res.status(200).json({
    status: true,
    message:"verifying payment"
  })
  console.log("verify status")
})



export default route;