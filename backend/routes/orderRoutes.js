import { addOrderItems } from "../controllers/orderController.js";

import { protect } from "../middleware/authMiddleware.js";

import express from "express";
const router = express.Router();

router.route("/").post(protect, addOrderItems);

export default router;
