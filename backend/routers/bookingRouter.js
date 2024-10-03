import express from "express"
import { getSessionCheckout} from "../controllers/bookingController.js"
import { authenticate} from "../middleware/auth.js"

const bookingRouter=express.Router()

bookingRouter.post("/checkout-session/:doctorId",authenticate,getSessionCheckout)


export default bookingRouter