import express from "express"
import { updateUser, deleteUser ,getAllUser,getSingleUser } from "../controllers/userController.js"
import { authenticate, restrict } from "../middleware/auth.js"


const userRouter=express.Router()

userRouter.put("/:id",authenticate,restrict(["patient"]),updateUser) // only patient can update his profile
userRouter.get("/",authenticate,restrict(["admin"]),getAllUser) //only admin can get all user
userRouter.get("/:id",authenticate,restrict(["patient"]),getSingleUser) //only patient can get his profile
userRouter.delete("/:id",authenticate,restrict(["patient"]),deleteUser) //only patient can delete his profile

export default userRouter
