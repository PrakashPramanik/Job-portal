import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';


import userRouter from './routes/user.route.js'; 
import jobRouter from './routes/jobRoutes.js';
import { connectDB } from './utils/db.js'
import dotenv from 'dotenv';
dotenv.config();

const app = express()
app.use(express.json())   
app.use(express.urlencoded({ extended: true }))


app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true              
}));

app.use("/api/user",userRouter)
app.use("/api/job", jobRouter);


app.listen(8000, ()=>{
    connectDB()
    console.log("connected")
})