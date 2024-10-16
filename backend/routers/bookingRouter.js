import express from "express"
import { getSessionCheckout} from "../controllers/bookingController.js"
import { authenticate, restrict} from "../middleware/auth.js"

const bookingRouter=express.Router()

bookingRouter.post("/checkout-session/:doctorId",authenticate,restrict(["patient"]),getSessionCheckout)


export default bookingRouter