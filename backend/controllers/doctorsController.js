import doctorModel from "../models/doctorModel.js";

export const updatedoctor=async (req,res)=>{
    const id = req.params.id
    try {
        const updateddoctor=await doctorModel.findByIdAndUpdate(id,{$set:req.body},{new:true});
        res.status(200).json({success:true,message:"Successfully Updated",data:updateddoctor})
    } catch (error) {
        console.log(error);
        res.json({ success:false,message:error})
    }
}

export const deletedoctor=async (req,res)=>{
    const id = req.params.id
    try {
        await doctorModel.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Successfully Deleted doctor"})
    } catch (error) {
        console.log(error);
        res.json({ success:false,message:error})
    }
}

export const getSingledoctor=async (req,res)=>{
    const id = req.params.id
    try {
        const singledoctor=await doctorModel.findById(id).select("-password");
        res.status(200).json({success:true,message:"doctor Found ",data:singledoctor})
    } catch (error) {
        console.log(error);
        res.json({ success:false,message:error})
    }
}

export const getAlldoctor=async (req,res)=>{
    try {

        const {query} =req.body
        let alldoctor;
        if(query){
            alldoctor=await doctorModel.find({isApproved:"approved",
                $or:[
                    {name:{$regex:query,$options:"i"}},
                    {specialization:{$regex:query,$options:"i"}},
                ]}).select("-password")
        }else{
            alldoctor=await doctorModel.find({isApproved:"approved"}).select("-password");
        }
         
        res.status(200).json({success:true,message:"doctors Found ",data:alldoctor})
    } catch (error) {
        console.log(error);
        res.json({ success:false,message:error})
    }
}