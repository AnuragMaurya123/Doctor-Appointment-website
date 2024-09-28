import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import authRouter from "./routers/authRouter.js"
import userRouter from "./routers/userRouter.js"
import doctorRouter from "./routers/doctorRouter.js"
import reviewsRouter from "./routers/reviewRouter.js"



dotenv.config()
connectDB()
connectCloudinary()

const app=express()
const port=process.env.PORT || 8000
const corsOption={
    origin: 'http://localhost:5173', // Change to your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}

app.get("/",(req,res)=>{
    res.send("Api is Working")
})

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOption))

//api endpoint
app.use("/api/auth",authRouter);
app.use("/api/users",userRouter);
app.use("/api/doctors",doctorRouter);
app.use("/api/reviews",reviewsRouter);





app.listen(port,()=>{
    console.log("server is running "+ port)
})