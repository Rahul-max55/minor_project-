import Product from "../schema/productSchema.js";
import CartItem from "../schema/CartSchema.js";

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

export const addToCartProductController = async (req, res) => {
  const cartData = req.body;
  const userId = req.user[0]?._id;


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
  try {
    const data = await CartItem.find();
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

export const deleteProductController = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const data = await Product.findByIdAndDelete({ _id: id });
    if (!data) {
      res.status(500).send("product is not found and deleted");
    }
    res.status(200).send("prodcut is delted successfuly");
  } catch (error) {
    res.status(500).send(`some error occured in product delete api ${error}`);
  }
};
