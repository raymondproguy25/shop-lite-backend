import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("authHeader",  authHeader);
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log("No token provided");
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
   console.log("Extracted token", token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token", decoded);
    req.user = await User.findById(decoded.userId).select('-password');
    next();
  } catch (error) {
    console.error("jwt verification failed", error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
