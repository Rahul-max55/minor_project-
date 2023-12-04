import express from "express";
import {
  getAllProductsController,
  editproductController,
  getSingleProductController,
  postProductsController,
  addToCartProductController,
  getToCartProductController,
  updateCartProductController,
  deleteCartProductController,
} from "../controllers/productController.js";
import { Authorization } from "../middlewares/userAuthorization.js";

const router = express.Router();

router.post("/addProduct",Authorization, postProductsController);
router.get("/products",Authorization, getAllProductsController);
router.get("/products/:id",Authorization, getSingleProductController);

// cartProduct
router.post("/addCartProduct/", Authorization, addToCartProductController);
router.get("/getCartProduct", Authorization, getToCartProductController);
router.put("/updateCartProduct",Authorization, updateCartProductController);

// cartProduct
router.put("/updateProduct/:id", Authorization, editproductController);
router.delete("/deleteProduct/:_id", Authorization, deleteCartProductController);

export default router;
