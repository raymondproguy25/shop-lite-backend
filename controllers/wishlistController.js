import User from '../models/userModel.js';
import Product from "../models/Products.js";

export const addToWishlist = async (req, res) => {
  const userId = req.user._id;
  const productid = req.params.productid;

  try {
    console.log("userId:", userId);
    console.log("productid:", productid);

    const product = await Product.findById(productid);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const user = await User.findById(userId);
    console.log("wishlist .user", user.wishlist);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Fetched user:", user);
    console.log("User.wishlist:", user.wishlist);

    if (user.wishlist && user.wishlist.includes(productid)) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    user.wishlist = user.wishlist || [];
    user.wishlist.push(productid);
    await user.save();

    res.status(201).json({ message: "Product added to wishlist" });
  } catch (error) {
    console.log("Controller error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist');
    res.status(200).json(user.wishlist);
  } catch (error) {
    console.log("Get wishlist error:", error);
    res.status(500).json({ message: "Failed fetching wishlist" });
  }
};
