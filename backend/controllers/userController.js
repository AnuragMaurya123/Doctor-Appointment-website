import userModel from "../models/userModel.js";

//creating function for updating user
export const updateUser=async (req,res)=>{
    const id = req.params.id
    try {
        //finding user by id and updating
        const updatedUser=await userModel.findByIdAndUpdate(id,{$set:req.body},{new:true});
        res.status(200).json({success:true,message:"Successfully Updated",data:updatedUser})
    } catch (error) {
        console.log(error);
        res.json({ success:false,message:error})
    }
}

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