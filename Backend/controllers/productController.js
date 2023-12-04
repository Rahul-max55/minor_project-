import Product from "../schema/productSchema.js";
import CartItem from "../schema/CartSchema.js";
import { ObjectId } from "mongodb";

export const postProductsController = async (req, res) => {
  const porductData = req.body;
  const user = req.user;
  try {
    const data = await Product.create(porductData);
    console.log(data);
    if (!data) {
      res.status(500).send("product data is not submited");
    }
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(`some error occured in product api ${error}`);
  }
};

export const getAllProductsController = async (req, res) => {
  try {
    const data = await Product.find();
    if (!data) {
      res.status(500).send("product data is not present");
    }
    res.status(200).send(data);
  } catch (error) {
    res
      .status(500)
      .send(`some error occured in getAllProductsController api ${error}`);
  }
};

export const getSingleProductController = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Product.find({ id: id });
    if (!data) {
      res.status(500).send("Single product data is not present");
    }
    res.status(200).send(data);
  } catch (error) {
    res
      .status(500)
      .send(`some error occured in product singleApi api ${error}`);
  }
};

// CARTS PRODUCTS CONTROLLER

export const addToCartProductController = async (req, res) => {
  const cartData = req.body;
  const userId = req.user[0]?._id;
  console.log(
    "🚀 ~ file: productController.js:54 ~ addToCartProductController ~ userId:",
    userId
  );

  try {
    const data = await CartItem.create({
      ...cartData,
      userId: userId,
    });

    if (!data) {
      res.status(500).send("CartProduct data is not updated");
    }
    res.status(200).send(data);
  } catch (error) {
    res
      .status(500)
      .send(`some error occured in product singleApi api ${error}`);
  }
};

export const getToCartProductController = async (req, res) => {
  const userId = (req.user[0]?._id).toString();
  // console.log(
  //   "🚀 ~ file: productController.js:73 ~ getToCartProductController ~ userId:",
  //   userId
  // );

  try {
    const data = await CartItem.find({ userId });
    console.log(data);
    if (!data) {
      res.status(500).send("Single product data is not present");
    }
    res.status(200).send(data);
  } catch (error) {
    res
      .status(500)
      .send(
        `some error occured in get getToCartProductController api ${error}`
      );
  }
};

export const updateCartProductController = async (req, res) => {
  const { id, count } = req.body;

  try {
    const data = await CartItem.findByIdAndUpdate(
      { _id: id },
      { count: count }
    );
    if (!data) {
      res.status(500).send("Single product data is not updated");
    }
    res.status(200).send(data);
  } catch (error) {
    res
      .status(500)
      .send(
        `some error occured in get updateCartProductController api ${error}`
      );
  }
};

export const editproductController = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Product.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    if (!data) {
      res.status(500).send("product is not edited");
    }
    res.status(200).send("prodcut is edited successfuly : " + data);
  } catch (error) {
    res.status(500).send(`some error occured in product edit api ${error}`);
  }
};

export const deleteCartProductController = async (req, res) => {
  const { _id } = req.params;
  console.log(_id); // i am getting this id 656720b8ee1e429f6de5c1c4
  const objectId = new ObjectId(_id);
  try {
    const data = await CartItem.findByIdAndDelete({ _id: objectId });
    console.log(
      "🚀 ~ file: productController.js:128 ~ deleteCartProductController ~ data:",
      data
    );
    if (!data) {
      return res.status(500).send("product is not found in database");
    }
    return res.status(200).send("prodcut is deleted successfuly");
  } catch (error) {
    return res
      .status(500)
      .send(`some error occured in product delete api ${error}`);
  }
};
