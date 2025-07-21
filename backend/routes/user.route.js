import express from 'express'
import { login, register,logout,updateProfile } from '../controller/user.controller.js'
import upload from '../middlewares/upload.js';
import { authenticateUser } from '../middlewares/authenticateUser.js';

const router = express.Router()

// router.route("/register").post(register)
router.post("/register", upload.single("image"), register);
router.route("/login").post(login)
router.route("/logout").post(logout)
router.put(
  '/updateProfile',
  authenticateUser,
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'resume', maxCount: 1 }
  ]),
  updateProfile
);


export default router