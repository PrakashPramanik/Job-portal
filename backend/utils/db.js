import mongoose from "mongoose";


export const connectDB = async ()=>{
   try {
     await mongoose.connect(process.env.MONGODB_URI)
    console.log("database connected")
   } catch (error) {
    console.log(error)
   }
}



