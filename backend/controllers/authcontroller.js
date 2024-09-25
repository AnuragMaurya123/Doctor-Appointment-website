import validator from "validator"
import doctorModel from "../models/doctorModel.js"
import userModel from "../models/userModel.js"
import bcrypt from "bcryptjs"
import { v2 as cloudinary } from 'cloudinary';
import jwt from "jsonwebtoken"
const createjwt = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET,{
        expiresIn:"15d"
    });
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

        // Define the user data
        const userData = {
            email,
            password: hashingPassword,
            name,
            role,
            photo: uploadResult.secure_url,
            gender,
        };

        let newUser=null
        //creating new user and new doctors Account 
        if(role==="patient"){
           newUser=await userModel.create(userData)    
        }else if (role==="doctor"){
            newUser=await doctorModel.create(userData)  
        }

        console.log(newUser);
        

        //saving User with jwt token
        const token = createjwt(newUser)
        const {password:_,...rest}=newUser._doc
        res.json({
            success:true,
            token,
            data:{...rest}
        }); 



        
    } catch (error) {
        console.log(error)
        res.json({message:error.message})
    }
}

// for register user
export const login=async(req,res)=>{
    try {
        const {email,password}= req.body
        //finding user is exists or not
        const patient = await userModel.findOne({email})
        const doctor = await doctorModel.findOne({email})
        let user=null
        if(patient){
           user=patient 
        }
        if(doctor){
           user=patient 
        }

        if (!user) {
            return res.json({success:false,message:"User dosn't not exists"}) 
         }
       
       
             const isMatch=await bcrypt.compare(password,user.password) 
             if (!isMatch) {
                return res.json({success:false,message:"Invalid parameter"})  
            }
            
            
            const token=createjwt(user)
            const {password:_,role,appointments,...rest}=user._doc
            return res.json({
                success:true,
                token,
                data:{...rest}
            })
      
        
    } catch (error) {
        console.log(error);
        res.json({ success:false,message:error})
    }
}
