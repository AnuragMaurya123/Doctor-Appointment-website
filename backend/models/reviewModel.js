import mongoose from "mongoose";
import doctorModel from "./doctorModel.js";

const reviewSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

// retrieving the data of user(name,photo)
reviewSchema.pre(/^find/,function(next){
   this.populate({
    // this user refer to userModel
    path:"user", 
    select:"name photo"
   })

   next()
})

reviewSchema.statics.calcAverageRatings=async function (doctorId) {
    const stats=await this.aggregate([
        {
            $match:{doctor:doctorId}
        },
        {
            $group:{
                _id:"$doctor",
                numOfRating:{$sum:1},
                avgRating:{$avg:"$rating"}
            }
        }
    ])

    await doctorModel.findByIdAndUpdate(doctorId,{
            totalRating:stats[0].numOfRating,
            averageRating:stats[0].avgRating.toFixed(2),
    })
    
}

reviewSchema.post("save",function(){
    this.constructor.calcAverageRatings(this.doctor)
})

export default mongoose.model("Review", reviewSchema);