import mongoose from "mongoose";

const connectDB=async ()=>{
    mongoose.connection.on("connected",()=>{
        console.log("databases is connected");
        
    })
    await mongoose.connect(`${process.env.MONGODB_URL}/doctor-booking`)
}

export default connectDB