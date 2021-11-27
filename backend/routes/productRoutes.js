import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";

import express from "express";
const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

export default router;
