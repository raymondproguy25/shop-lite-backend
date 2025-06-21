import express from "express";
import { addToWishlist, getWishlist } from "../controllers/wishlistController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/:productid", auth, addToWishlist);
router.get("/", auth, getWishlist);

export default router;
