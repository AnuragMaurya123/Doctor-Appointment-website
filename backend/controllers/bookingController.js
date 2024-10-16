import bookingModel from "../models/bookingModel.js";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import dotenv from 'dotenv';

dotenv.config(); // Ensure environment variables are loaded

export const getSessionCheckout = async (req, res) => {
    const { origin } = req.headers;

    try {

        const doctor = await doctorModel.findById(req.params.doctorId);
        const user = await userModel.findById(req.UserId); // Changed to req.userId

        if (!doctor ) {
            return res.status(404).json({ success: false, message: "Doctor  not found" });
        }
        if (!user) {
            return res.status(404).json({ success: false, message: " user not found" });
        }

        console.log("Stripe Secret:", process.env.STRIPE_SECRET); // Debugging log

        const stripe = new Stripe(process.env.STRIPE_SECRET);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            success_url: `${origin}/checkout-success`,
            cancel_url: `${req.protocol}://${req.get("host")}/doctors/${doctor.id}`,
            customer_email: user.email,
            client_reference_id: req.params.doctorId,
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        unit_amount: doctor.ticketPrice * 100,
                        product_data: {
                            name: doctor.name,
                            description: doctor.bio,
                            images: [doctor.photo],
                        },
                    },
                    quantity: 1,
                },
            ],
        });

        // Create new booking
        const booking = new bookingModel({
            doctor: doctor.id,
            user: user.id,
            ticketPrice: doctor.ticketPrice,
            session: session.id,
        });

        await booking.save();
        res.json({ success: true, message: "Successfully created session", session });

    } catch (error) {
        console.error("Error:", error); // Log error details
        res.status(500).json({ success: false, message: error.message }); // Return error response
    }
};
