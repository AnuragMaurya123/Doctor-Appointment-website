import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import authRouter from "./routers/authrouter.js"

dotenv.config()
connectDB()
connectCloudinary()

const app=express()
const port=process.env.PORT || 8000
const corsOption={
    origin:true
}

app.get("/",(req,res)=>{
    res.send("Api is Working")
})

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOption))

//api endpoint
app.use("/api/user",authRouter);




app.listen(port,()=>{

    console.log("server is running "+ port)
})