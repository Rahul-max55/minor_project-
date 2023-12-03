import express from "express";
import {
  getAllProductsController,
  deleteProductController,
  editproductController,
  getSingleProductController,
  postProductsController,
  addToCartProductController,
  getToCartProductController,
  updateCartProductController,
} from "../controllers/productController.js";
import { Authorization } from "../middlewares/userAuthorization.js";

const router = express.Router();

router.post("/addProduct", postProductsController);
router.get("/products", getAllProductsController);
router.get("/products/:id", getSingleProductController);

// cartProduct
router.post("/addCartProduct/", Authorization, addToCartProductController);
router.get("/getCartProduct", Authorization, getToCartProductController);
router.put("/updateCartProduct", updateCartProductController);

// cartProduct
router.put("/updateProduct/:id", Authorization, editproductController);
router.delete("/deleteProduct/:id", Authorization, deleteProductController);

export default router;
