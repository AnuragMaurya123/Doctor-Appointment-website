import reviewModel from "../models/reviewModel.js";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";

//creating function for getting All Reviews of doctor
export const  getAllReviews=async (req,res)=>{
    try {
        const reviews =await reviewModel.find({})
        res.status(200).json({success:true,message:"Successful ",data:reviews})
    } catch (error) {
        res.status(401).json({success:false,message:"Not Found"})
    }
}

//creating function for Reviews to doctor
export const  createReviews=async (req,res)=>{ 
    if (!req.body.doctor) req.body.doctor=req.params.doctorId
    if (!req.body.user) req.body.user = req.UserId;
    
    //instance of review
    const newReview=new reviewModel(req.body)
    try {
        //saving review in database
        const savedReview=await newReview.save()
        //pushing id of review to doctor detail
        await doctorModel.findByIdAndUpdate(req.body.doctor,{
            $push:{reviews:savedReview._id}
        })
        res.status(200).json({success:true,message:"Review submit successful ",data:savedReview})
        
    } catch (error) {
        res.status(401).json({success:false,message:error.message})
        
    }

}