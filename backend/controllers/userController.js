import userModel from "../models/userModel.js";

export const updateUser=async (req,res)=>{
    const id = req.params.id
    try {
        const updatedUser=await userModel.findByIdAndUpdate(id,{$set:req.body},{new:true});
        res.status(200).json({success:true,message:"Successfully Updated",data:updatedUser})
    } catch (error) {
        console.log(error);
        res.json({ success:false,message:error})
    }
}

export const deleteUser=async (req,res)=>{
    const id = req.params.id
    try {
        await userModel.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Successfully Deleted User"})
    } catch (error) {
        console.log(error);
        res.json({ success:false,message:error})
    }
}

export const getSingleUser=async (req,res)=>{
    const id = req.params.id
    try {
        const singleUser=await userModel.findById(id).select("-password");
        res.status(200).json({success:true,message:"User Found ",data:singleUser})
    } catch (error) {
        console.log(error);
        res.json({ success:false,message:error})
    }
}

export const getAllUser=async (req,res)=>{
    try {
        const allUser=await userModel.find({}).select("-password");
        res.status(200).json({success:true,message:"Users Found ",data:allUser})
    } catch (error) {
        console.log(error);
        res.json({ success:false,message:error})
    }
}