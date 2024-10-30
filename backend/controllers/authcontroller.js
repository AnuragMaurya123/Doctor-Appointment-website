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
export const register = async (req, res) => {
    const { email, password, name, role, gender } = req.body;
    
    // Getting images
    let photo = req.file;
 
    try {
      let user = null;
      let uploadResult = null;
  
      // Attempt Cloudinary upload if photo exists
      if (photo) {
        try {
          uploadResult = await cloudinary.uploader.upload(photo.path, { resource_type: "image" });
        } catch (error) {
          console.error("Error during image upload:", error);
          return res.status(500).json({ message: "Failed to upload profile image" });
        }
      } else {
        uploadResult = { secure_url: "https://res.cloudinary.com/dbg64eker/image/upload/v1727327044/profile_xpm84y.webp" };
      }
  
      // Checking if user is a patient or doctor
      if (role === "patient") {
        user = await userModel.findOne({ email });
      } else if (role === "doctor") {
        user = await doctorModel.findOne({ email });
      }
  
      // User existence check
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Email validation
      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Please enter a valid email address" });
      }
  
      // Password length validation
      if (password.length < 8) {
        return res.status(400).json({ message: "Password should be at least 8 characters long" });
      }
  
      // Hashing password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Define user data
      const userData = {
        email,
        password: hashedPassword,
        name,
        role,
        photo: uploadResult.secure_url,
        gender,
      };
  
      // Create new user or doctor account
      let newUser = null;
      if (role === "patient") {
        newUser = await userModel.create(userData);
      } else if (role === "doctor") {
        newUser = await doctorModel.create(userData);
      }
  
      // Verify user creation and create JWT token
      if (!newUser) {
        return res.status(500).json({ message: "User registration failed" });
      }
  
      const token = createjwt(newUser);
  
      // Send response with user data excluding password
      const { password: _, appointments, ...userInfo } = newUser._doc;
      res.json({
        success: true,
        message: "Registered successfully",
        token,
        data: userInfo,
      });
  
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: error.message || "An unexpected error occurred during registration" });
    }
  };
  

// for register user
export const login=async(req,res)=>{
    try {
        const {email,password}= req.body
        //finding user is exists or not
        const patient = await userModel.findOne({email})
        const doctor = await doctorModel.findOne({email})
        let user=null
        //switching user between patient and doctor
        if(patient){
           user=patient 
        }
        if(doctor){
           user=doctor
        }

        // if user not found
        if (!user) {
            return res.json({success:false,message:"User dosn't not exists"}) 
         }
       
            //checking password
             const isMatch=await bcrypt.compare(password,user.password) 
             if (!isMatch) {
                return res.json({success:false,message:"Invalid parameter"})  
            }
            
            //creating token 
            const token=createjwt(user)
            //passing the date of user escape password
            const {password:_,role,appointments,...rest}=user._doc
            return res.json({
                success:true,
                token,
                role,
                data:{...rest}
            })
      
        
    } catch (error) {
        console.log(error);
        res.json({ success:false,message:error})
    }
}

