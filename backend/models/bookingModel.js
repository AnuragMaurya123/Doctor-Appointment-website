    import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticketPrice: { type: String, required: true },
   
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// retrieving the data of user(name,photo)
bookingSchema.pre(/^find/,function(next){
  this.populate("user").populate({
   // this user refer to userModel
   path:"doctor", 
   select:"name"
  })

  next()
})

export default mongoose.model("Booking", bookingSchema);