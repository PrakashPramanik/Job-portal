import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
        },

        phoneNumber: {
            type: Number,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['student', 'recruiter'],
            required: true,
        },

        profileImage: {
            type: String,
            default: "",
        },
        resume: {
            type: String, // Cloudinary URL of uploaded resume
            default: ""
        },
        resumeOriginalName: {
            type: String, // Original filename
            default: ""
        }
        


    }, {
    timestamps: true
}
)

export const User = mongoose.model('User', userSchema)

