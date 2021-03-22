import express from "express";
import ProductController from "../controller/productController.js";
import { admin, protect } from "../../../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protect, admin, ProductController.createProduct)
  .get(protect, ProductController.getProducts);
router
  .route("/:id")
  .delete(protect, admin, ProductController.deleteProduct)
  .get(protect, ProductController.getProductById)
  .put(protect, admin, ProductController.updateProduct);

export default router;
