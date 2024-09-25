import doctorModel from "../models/doctorModel.js";

//creating function for updating doctor
export const updatedoctor=async (req,res)=>{
    const id = req.params.id
    try {
        //updating doctor data by id
        const updateddoctor=await doctorModel.findByIdAndUpdate(id,{$set:req.body},{new:true});
        res.status(200).json({success:true,message:"Successfully Updated",data:updateddoctor})
    } catch (error) {
        console.log(error);
        res.json({ success:false,message:error})
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

        const {query} =req.body
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