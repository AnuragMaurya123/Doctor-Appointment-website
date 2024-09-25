import express from "express"
import {createReviews,getAllReviews} from "../controllers/reviewController.js"
import { authenticate, restrict } from "../middleware/auth.js"

// instance router and getting doctor id from doctorRouter
const reviewsRouter=express.Router({mergeParams:true});

reviewsRouter.route("/")
    .get(getAllReviews) //getting all review of doctors
    .post(authenticate,restrict(["patient"]), createReviews); //only patient create doctor review


export default reviewsRouter;