import express from "express"
import { register,login} from "../controllers/authcontroller.js"
import upload from '../middleware/multer.js';


const authRouter=express.Router();
authRouter.post("/register", upload.single('photo'), register);
authRouter.post("/login",login)


export default authRouter;