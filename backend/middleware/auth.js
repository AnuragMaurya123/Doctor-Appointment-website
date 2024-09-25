import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"
import doctorModel from "../models/doctorModel.js"

export const authenticate=(req,res,next)=>{
    //get token from header
    const authToken=req.headers.authorization

    //checking token exists 
    if (!authToken || !authToken.startsWith('Bearer ')) {
       return res.status(400).json({success:false,message:"Your not Authorized"}) 
    }

    try {
        //spilting bearer from token
       const token = authToken.split(" ")[1];
       //decoding token 
       const decoded_token= jwt.verify(token,process.env.JWT_SECRET)
       //after decoding token passing id and role
       req.UserId=decoded_token.id
       req.role=decoded_token.role
        next()
    } catch (error) {
        if(error.name === "TokenExpiredError"){
         return res.status(401).json({ success:false,message:"Session is Expire! Please Login Again"})
        }
       
       return res.status(401).json({ success:false,message:"Invalid Session"})
    }
}
// Middleware to restrict access based on user roles
export const restrict = (roles) => async (req, res, next) => {
    const UserId = req.UserId; // Use UserId from authenticated request

    // Try to find the user in either the patient or doctor collection
    const patient = await userModel.findById(UserId);
    const doctor = await doctorModel.findById(UserId);
    
    //switching user between patient and doctor 
    let user=null
    if(patient){
        user=patient 
     }
     if(doctor){
        user=doctor 
     }
     
    // If no user found or user role is not in the allowed roles, reject access
    if (!user || !roles.includes(user.role)) {
        return res.status(403).json({ success: false, message: "You're not authorized to access this resource" });
    }

    next(); // Proceed if the user is authorized
};