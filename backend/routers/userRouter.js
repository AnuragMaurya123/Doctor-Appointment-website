import express from "express"
import { updateUser, deleteUser ,getAllUser,getSingleUser, getUserProfile, getUserAppointment } from "../controllers/userController.js"
import { authenticate, restrict } from "../middleware/auth.js"
import upload from "../middleware/multer.js"


const userRouter=express.Router()

userRouter.put("/:id",authenticate,restrict(["patient"]),upload.single('photo'),updateUser) // only patient can update his profile
userRouter.get("/",authenticate,restrict(["admin"]),getAllUser) //only admin can get all user
userRouter.get("/:id",authenticate,restrict(["patient"]),getSingleUser) //only patient can get his profile
userRouter.delete("/:id",authenticate,restrict(["patient"]),deleteUser) //only patient can delete his profile
userRouter.get("/profile/me",authenticate,restrict(["patient"]),getUserProfile) //getting user profile
userRouter.get("/appointment/my-appointment",authenticate,restrict(["patient"]),getUserAppointment) //getting user appointment 

export default userRouter
