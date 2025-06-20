import express from "express";
import User from "../models/userModel.js";
import { signup, signin } from '../controllers/userController.js';

const router = express.Router();

router.get("/", async (req, res) =>{
  try {
   // console.log("Fatched users:", users);
    const users = await User.find();
    res.json(users);
    console.log("Fatched users:", users);
  } catch (error) {
     console.log('Error message', error.message);
    res.status(500).json({ message: 'Failed to fetch' });
  }
});

router.post("/signup", signup);
router.post("/signin", signin);

export default router;
