import express from "express"
import { updatedoctor, deletedoctor ,getAlldoctor,getSingledoctor, getDoctorProfile } from "../controllers/doctorsController.js"
import { authenticate, restrict } from "../middleware/auth.js"
import reviewsRouter from "./reviewRouter.js"
import upload from "../middleware/multer.js"
// instance of router
const doctorRouter=express.Router()
// mounting review to related doctor
doctorRouter.use("/:doctorId/reviews",reviewsRouter)
//  restricting for updating doctor profile escape doctor 
doctorRouter.put("/:id",authenticate,restrict(["doctor"]),upload.single('photo'),updatedoctor)
doctorRouter.get("/",getAlldoctor)
doctorRouter.get("/:id",getSingledoctor)
//  restricting for deleting doctor profile escape doctor 
doctorRouter.delete("/:id",authenticate,restrict(["doctor"]),deletedoctor)

doctorRouter.get("/profile/me",authenticate,restrict(["doctor"]),getDoctorProfile) //getting user profile

export default doctorRouter
