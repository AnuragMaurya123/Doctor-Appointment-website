import express from "express"
import { updatedoctor, deletedoctor ,getAlldoctor,getSingledoctor } from "../controllers/doctorsController.js"
import { authenticate } from "../middleware/auth.js"

const doctorRouter=express.Router()

doctorRouter.put("/:id",authenticate,restrict(["doctor"]),updatedoctor)
doctorRouter.get("/",authenticate,restrict(["admin"]),getAlldoctor)
doctorRouter.get("/:id",authenticate,restrict(["doctor"]),getSingledoctor)
doctorRouter.delete("/:id",authenticate,restrict(["doctor"]),deletedoctor)

export default doctorRouter
