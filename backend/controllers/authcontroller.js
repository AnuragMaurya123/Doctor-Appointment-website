import validator from "validator"
import doctorModel from "../models/doctorModel.js"
import userModel from "../models/userModel.js"
import bcrypt from "bcryptjs"
import { v2 as cloudinary } from 'cloudinary';
import jwt from "jsonwebtoken"


const createjwt=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// for register user
export const register=async(req,res)=>{

    const {email, password, name, role, gender}=req.body
    
     //getting images
     let photo = req.file;

    try {
        let user=null

       
        //storing in cloudinary 
        const uploadResult = await cloudinary.uploader.upload(photo.path, {resource_type: "image"});
         
        //checking user is patient or doctor
        if(role==="patient"){
            user=await userModel.findOne({email})
        }else if(role==="doctor"){
            user=await doctorModel.findOne({email})
        }

        //checking patient or doctor is already exists or not
        if (user) {
            return res.status(400).json({message:"User already Exists"})
        } 
        
        //checking email address is  valid
        if(!validator.isEmail(email)){
            return res.status(400).json({message:"Please Enter valid email"})
        }

        //checking password length is more 8 char
        if (password.length<8) {
            return res.status(400).json({message:"Your Password should have 8 letter"})
        }

        //bcrypting Password
        const salt = await bcrypt.genSalt(10)
        const hashingPassword= await bcrypt.hash(password,salt)

        //creating new user and new doctors Account 
        if(role==="patient"){
            const newUser= userModel.create({
                email, 
                password:hashingPassword, 
                name, 
                role:"patient", 
                photo:uploadResult.secure_url, 
                gender
            })
                //saving User with jwt token
                const token = createjwt(newUser._id)
                res.json({
                    success:true,
                    token,
                }); 
        }else if (role==="doctor"){
            const newDoctor= doctorModel.create({
                email, 
                password:hashingPassword, 
                name, 
                role:"doctor", 
                photo:uploadResult.secure_url, 
                gender
            })
            //saving User with jwt token
            const token = createjwt(newDoctor._id)
            res.json({
                success:true,
                token
            });
        }



        
    } catch (error) {
        console.log(error)
        res.json({message:error.message})
    }
}

// for register user
export const login=async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}