import userModel from "../models/userModel.js";
import bookingModel from "../models/bookingModel.js";
import doctorModel from "../models/doctorModel.js";
import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose'; // Ensure mongoose is imported
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const createjwt = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET,{
        expiresIn:"15d"
    });
}
export const updateUser = async (req, res) => {
    const id = req.params.id;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid user ID format" });
    }

    // Check if user exists
    const isUserExists = await userModel.findById(id);
    if (!isUserExists) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    try {
        // Pick only the fields that can be updated
        const { name, email, password, gender, bloodType } = req.body;
        const photo = req.file;
       
        if (photo) {
            // Extract public ID from the existing photo URL
            const publicId = isUserExists.photo.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId);
            
            // Upload the new image
            const newPhoto = await cloudinary.uploader.upload(photo.path, { resource_type: "image" });

            // Update the photo field with the new secure URL
            isUserExists.photo = newPhoto.secure_url;
        }
         //checking password length is more 8 char
         if (password.length<8) {
            return res.status(400).json({message:"Your Password should have 8 letter"})
        }
        if (password) {
            const salt = await bcrypt.genSalt(10)
        const hashingPassword= await bcrypt.hash(password,salt)
        isUserExists.password = hashingPassword
        }
        

        // Update user details
        const updatedUser = await userModel.findByIdAndUpdate(
            id,
            { $set: { name, email, password:isUserExists.password, gender, photo:isUserExists.photo, bloodType } }, // Set the updated photo URL here
            { new: true } // Return the updated user
        );

        // If user doesn't exist
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const token = createjwt(updatedUser)
        res.status(200).json({ success: true, message: "Successfully Updated", data: updatedUser ,token});
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error, could not update user" });
    }
};


//creating function for deleting user
export const deleteUser=async (req,res)=>{
    const id = req.params.id
    try {
         //finding user by id and Deleting
        await userModel.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Successfully Deleted User"})
    } catch (error) {
        console.log(error);
        res.json({ success:false,message:error})
    }
}

//creating function for getting only one user
export const getSingleUser=async (req,res)=>{
    const id = req.params.id
    try {
         //finding user by id and getting user data escape password
        const singleUser=await userModel.findById(id).select("-password");
        console.log(singleUser);
        
        res.status(200).json({success:true,message:"User Found ",data:singleUser})
    } catch (error) {
        console.log(error);
        res.json({ success:false,message:error})
    }
}

//creating function for getting all user
export const getAllUser=async (req,res)=>{
    try {
         //getting all user and user data escape password
        const allUser=await userModel.find({}).select("-password");
        res.status(200).json({success:true,message:"Users Found ",data:allUser})
    } catch (error) {
        console.log(error);
        res.json({ success:false,message:error})
    }
}


export const getUserProfile=async (req,res)=>{
    //getting userIg from middleware
    const userId =req.userId
    try {
       //finding user profile 
       const user = await userModel.findOne({userId})
      
          // if user not found
        if (!user) {
            return res.json({success:false,message:"User not found"}) 
         }
       
         const {password:_,bloodType,...rest}=user._doc
         return res.json({success:true,data:{...rest,bloodType}}) 


    } catch (error) {
        console.log(error);
        res.json({ success:false,message:"Somthing went wrong can't get your profile"})
    }
}

export const getUserAppointment=async (req,res)=>{
    try {
        //retrieving  all appointment of user
        const booking=await bookingModel.find({user:req.UserId})
        
        
        //retriving all doctors ids which user get appointments
        const doctorsIds= booking.map(el=>el.doctor.id)
       

        //retriving doctor by doctor ids
        const doctors =await doctorModel.find({_id:{$in:doctorsIds}}).select('-password')
     
        
       
         return res.json({success:true,message:"Appointments are  getting",data:doctors}) 


    } catch (error) {
        console.log(error);
        res.status(400).json({ success:false,message:"Somthing went wrong can't get your profile"})
    }
}
