import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
    try {
      // console.log("Uploaded file:", req.file);
        const { fullName, email, phoneNumber, password, role } = req.body;
        if (!fullName || !email || !phoneNumber || !password || !role) {
            console.log(fullName, email, phoneNumber,password, role);
            return res.send("All fields are required");
        }

        const hasedPassword = await bcrypt.hash(password,10)

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User with this email already exists" });

        }
        const profileImage = req.file?.path || "";
        const newUser = await User.create({
            fullName,
            email,
            phoneNumber,
            password:hasedPassword,
            role,
            profileImage
        });

        res.status(201).json({
            message: "User registered successfully",
            user: newUser
        });

    } catch (error) {
        console.log(error)
    }
}


const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false,
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/',
};
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "All Fields are Required",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Incorrect Password",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Your role doesn't exist",
        success: false,
      });
    }

    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, "secret_key", { expiresIn: "1d" });

    res.cookie('token', token, COOKIE_OPTIONS);
    const cleanUser = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profileImage: user.profileImage,
      resume: user.resume,
      resumeOriginalName: user.resumeOriginalName
    };
//  console.log("Logged in user:", cleanUser);
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: cleanUser,
      token
    });

    

   
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};


export const logout=(req,res)=>{
    res.clearCookie('token',COOKIE_OPTIONS);
    res.status(200).json({success:true, message:"Logout success"});
}






import { cloudinary } from '../config/cloudinary.js';


export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    const { fullName, phoneNumber } = req.body;

    if (fullName) user.fullName = fullName;
    if (phoneNumber) user.phoneNumber = phoneNumber;

   
    if (req.files?.image) {
      const result = await cloudinary.uploader.upload(req.files.image[0].path, {
        folder: 'user_profiles',
        resource_type: 'image',
      });
      user.profileImage = result.secure_url;
    }

   
    if (req.files?.resume) {
      const resumeResult = await cloudinary.uploader.upload(req.files.resume[0].path, {
        folder: 'user_resumes',
        resource_type: 'raw', 
      });

      user.resume = resumeResult.secure_url;
      user.resumeOriginalName = req.files.resume[0].originalname;
    }

    await user.save();

    const cleanUser = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profileImage: user.profileImage,
      resume: user.resume,
      resumeOriginalName: user.resumeOriginalName
    };

    res.status(200).json({
      message: 'Profile updated successfully',
      user: cleanUser
    });

  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};




