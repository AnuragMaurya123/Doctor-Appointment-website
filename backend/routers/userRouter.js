import express from "express"
import { updateUser, deleteUser ,getAllUser,getSingleUser } from "../controllers/userController.js"
import { authenticate, restrict } from "../middleware/auth.js"

const userRouter=express.Router()

userRouter.put("/:id",authenticate,restrict(["patient"]),updateUser)
userRouter.get("/",authenticate,restrict(["admin"]),getAllUser)
userRouter.get("/:id",authenticate,restrict(["patient"]),getSingleUser)
userRouter.delete("/:id",authenticate,restrict(["patient"]),deleteUser)

export default userRouter
