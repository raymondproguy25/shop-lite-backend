import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// Sign-up
export const singup = async (req, res) =>{
  try {
    const { name, email, password, location } = req.body;
    if (!name || !email || !phone || !password) {
     return res.status(400).json({ message: "All fields are required" });
    const existing = await ({ email });
      if (existing) {
        return res.status(400).json({ message: "Email already exists" });
      } const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);
      const newUser = new User({ name, email, phone, password, hashPass, location });
      await newUser.save();
    } res.status(201).json({ message: "User creayed" });
  } catch (error) {
    res.status(500).json({message: "Server error"});
  }
};
// Sign-in 
export const singin = async (req, res) =>{
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
     if (!user) {
      return res.status(400).json({ message: "Invaled email" });
     }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invaled password" });
    }
    const 
  } catch (error) {
    
  }
}


