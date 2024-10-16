import bookingModel from "../models/bookingModel.js";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"
const CLIENT_SITE_URL="https://doctor-appointment-website-6ahz.vercel.app" || "http://localhost:5199"
export const getSessionCheckout=async (req,res)=>{
    try {
        const doctor=await doctorModel.findById(req.params.doctorId)
        const user=await userModel.findById(req.UserId)

        const stripe=new Stripe(process.env.STRIPE_SECRET)
        
        const session=await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            mode:"payment",
            success_url:`https://doctor-appointment-website-6ahz.vercel.app/checkout-success`,
            cancel_url:`${req.protocol}://${req.get("host")}/doctors/${doctor.id}`,
           
            customer_email:user.email,
            client_reference_id:req.params.doctorId,
            line_items:[
                {
                    price_data:{
                        currency:"inr",
                        unit_amount:doctor.ticketPrice*100,
                        product_data:{
                            name:doctor.name,
                            description:doctor.bio,
                            images:[doctor.photo]
                        }

                    },
                    quantity:1
                }
            ]

        })

        //create new booking
        const booking=new bookingModel({
            doctor:doctor.id,
            user:user.id,
            ticketPrice:doctor.ticketPrice,
            session:session.id
        })

        await booking.save()
        res.json({ success:true,message:"Successfully paid" ,session})


    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error creating checkout session"})
    }
}

export const getSessionCheckout2=async (req,res)=>{
    try {
        const doctor=await doctorModel.findById(req.params.doctorId)
        const user=await userModel.findById(req.UserId)

        const stripe=new Stripe(process.env.STRIPE_SECRET)
        
        const session=await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            mode:"payment",
            success_url:`${CLIENT_SITE_URL}/checkout-success`,
            cancel_url:`${req.protocol}://${req.get("host")}/doctors/${doctor.id}`,
           
            customer_email:user.email,
            client_reference_id:req.params.doctorId,
            line_items:[
                {
                    price_data:{
                        currency:"inr",
                        unit_amount:doctor.ticketPrice*100,
                        product_data:{
                            name:doctor.name,
                            description:doctor.bio,
                            images:[doctor.photo]
                        }

                    },
                    quantity:1
                }
            ]

        })

        //create new booking
        const booking=new bookingModel({
            doctor:doctor.id,
            user:user.id,
            ticketPrice:doctor.ticketPrice,
            session:session.id
        })

        await booking.save()
        res.json({ success:true,message:"Successfully paid" ,session})


    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error creating checkout session"})
    }
}