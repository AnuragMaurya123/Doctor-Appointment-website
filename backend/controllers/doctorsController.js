import bookingModel from "../models/bookingModel.js";
import doctorModel from "../models/doctorModel.js";
import { v2 as cloudinary } from 'cloudinary';
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const createjwt = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET,{
        expiresIn:"15d"
    });
}


//creating function for updating doctor
export const updatedoctor=async (req,res)=>{
    const id = req.params.id
    // Check if user exists
    const doctor = await doctorModel.findById(id);
    if (!doctor) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
    try {
         // Pick only the fields that can be updated
         const { name, email, password, gender, phone,ticketPrice,specialization, qualifications,experiences,bio,about,timeSlots} = req.body;
         const photo = req.file;

         const updateData={}

         if (photo) {
            // Extract public ID from the existing photo URL
            const publicId = doctor.photo.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId);
            
            // Upload the new image
            const newPhoto = await cloudinary.uploader.upload(photo.path, { resource_type: "image" });

            // Update the photo field with the new secure URL
            updateData.photo = newPhoto.secure_url;
        }
         if (password) {
            //checking password length is more 8 char
         if (password.length<8) {
            return res.status(400).json({message:"Your Password should have 8 letter"})
        }
        
        const salt = await bcrypt.genSalt(10)
        const hashingPassword= await bcrypt.hash(password,salt)
        updateData.password = hashingPassword
       
        }
      
          // Update other fields only if they are provided
       if (name) updateData.name = name;
       if (email) updateData.email = email;
       if (gender) updateData.gender = gender;
       if (phone) updateData.phone = phone;
       if (ticketPrice) updateData.ticketPrice = ticketPrice;
       if (specialization) updateData.specialization = specialization;
       if (qualifications) updateData.qualifications = qualifications;
       if (experiences) updateData.experiences = experiences;
       if (bio) updateData.bio = bio;
       if (about) updateData.about = about;
       if (timeSlots) updateData.timeSlots = timeSlots;
        
        
        
        // Update doctor details
        const updateddoctor = await doctorModel.findByIdAndUpdate(
            id,
            { $set: updateData}, // Set the updated photo URL here
            { new: true } // Return the updated user
        );
    
        const token =createjwt(updateddoctor)
        const {password:_,...rest}=updateddoctor._doc

        res.status(200).json({success:true,message:"Successfully Updated",data:{...rest},token})
    } catch (error) {
        console.log(error);
        res.json({ success:false,message:"Internal Server Error"})
    }
}

//creating function for deleting doctor
export const deletedoctor=async (req,res)=>{
    const id = req.params.id
    try {
        //deleting doctor data by id
        await doctorModel.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Successfully Deleted doctor"})
    } catch (error) {
        console.log(error);
        res.json({ success:false,message:error})
    }
}

//creating function for getting Single doctor
export const getSingledoctor=async (req,res)=>{
    const id = req.params.id
    try {
        //getting data of single doctor and getting data doctor reviews
        const singledoctor=await doctorModel.findById(id).populate("reviews").select("-password");
        res.status(200).json({success:true,message:"doctor Found ",data:singledoctor})
    } catch (error) {
        console.log(error);
        res.json({ success:false,message:error})
    }
}

//creating function for getting all doctor
export const getAlldoctor=async (req,res)=>{
    try {

        const {query} =req.query
        let alldoctor;
        if(query){
            alldoctor=await doctorModel.find({
                isApproved:"approved", // only getting approved doctor
                $or:[  //applying OR condition
                    {name:{$regex:query,$options:"i"}}, // Case-insensitive search on the name field
                    {specialization:{$regex:query,$options:"i"}}, // Case-insensitive search on the specialization field
                ]}).select("-password")                
        }else{
            //only getting approved doctor
            alldoctor=await doctorModel.find({isApproved:"approved"}).select("-password");
          
        }
         
        res.status(200).json({success:true,message:"doctors Found ",data:alldoctor})
    } catch (error) {
        console.log(error);
        res.json({ success:false,message:error})
    }
}

export const getDoctorProfile=async (req,res)=>{
    //getting userIg from middleware
    const doctorId =req.UserId
    
    
    try {
       //finding user profile 
       const doctor = await doctorModel.findOne({_id:doctorId})
       
          // if user not found
        if (!doctor) {
            return res.json({success:false,message:"doctor not found"}) 
         }
       
         const {password:_,...rest}=doctor._doc
       
         
         
         const appointments=await bookingModel.find({doctor:doctor.id})
         return res.json({
            success:true,
            message:"getting profile info",
            data:{...rest,appointments}}) 


    } catch (error) {
        console.log(error);
        res.json({ success:false,message:"Somthing went wrong can't get your profile"})
    }
}