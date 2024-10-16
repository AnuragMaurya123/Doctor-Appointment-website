import bookingModel from "../models/bookingModel.js";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"

export const getSessionCheckout = async (req, res) => {
    const { origin } = req.headers;

    try {
        // Log the origin for debugging
        console.log("Request Origin:", origin);

        // Ensure that origin is valid
        if (!origin) {
            throw new Error("Origin is undefined or invalid. Ensure the request contains a valid origin header.");
        }

        const doctor = await doctorModel.findById(req.params.doctorId);
        const user = await userModel.findById(req.userId); // Ensure req.userId is correctly set

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
        console.error("Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

