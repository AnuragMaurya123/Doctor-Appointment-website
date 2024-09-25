import express from "express"
import { register,login} from "../controllers/authcontroller.js"
import upload from '../middleware/multer.js';

// instance of router
const authRouter=express.Router();
// register user and doctor with photo
authRouter.post("/register", upload.single('photo'), register);
// login user and doctor
authRouter.post("/login",login)


export default authRouter;