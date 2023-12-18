import Product from "../schema/productSchema.js";
import CartItem from "../schema/CartSchema.js";
import { ObjectId } from "mongodb";
import order from "../schema/OrderSchema.js";
import Users from "../schema/singupSchema.js";

export const postProductsController = async (req, res) => {
  const porductData = req.body;
  const user = req.user;
  try {
    const data = await Product.create(porductData);
    // console.log(data);
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
      .send(
        `🚀 ~ file: productController.js:46 ~ getSingleProductController ~ error: ${error}`
      );
  }
};

// ------------------------------CARTS PRODUCTS CONTROLLER-------------------------------------------------
// --------------------------------------------------------------------------------------------------------

export const addToCartProductController = async (req, res) => {
  const cartData = req.body;
  const userId = req.user?._id;

  //  if we does not delete this id mongodb id is overlaped and products dublicate problem we can get so we remove the _id inside the cartData
  delete cartData?._id;
  try {
    // diff prodcuts colors qantity check
    const Products = await CartItem.find({
      $and: [{ userId: userId }, { id: cartData?.id }],
    });

    //Total Product Quantity means diff colors and same prodcuts quantity
    const totalProductQuantity = Products.reduce((total, val, index) => {
      return (total = total + val?.customerStock);
    }, 0);

    let totalQuantity = cartData?.customerStock + totalProductQuantity;
    let remainProcuts = cartData?.stock - totalProductQuantity;

    if (totalQuantity > cartData?.stock) {
      if (remainProcuts > 0) {
        return res.status(200).json({
          msg: `Only ${remainProcuts} prodcuts is left harryUp!`,
          status: false,
        });
      }

      if (totalQuantity >= cartData?.stock) {
        return res
          .status(200)
          .json({ msg: "Product is not available in stocks", status: false });
      }
      return res
        .status(200)
        .json({ msg: "Product is not available in stocks", status: false });
    }

    // find product is added or not if added increse count
    const productExists = await CartItem.find({
      $and: [
        { userId: userId },
        { id: cartData?.id },
        { colors: cartData?.colors },
      ],
    });
    if (productExists.length > 0) {
      const { _id } = productExists?.[0];
      const data = await CartItem.findByIdAndUpdate(
        { _id: _id },
        { customerStock: totalQuantity }
      );
      if (!data) {
        return res
          .status(200)
          .json({ msg: "cart product data is not updated" });
      }
      return res
        .status(200)
        .json({ data, msg: "prodcut quantity is incresed in your cart" });
    }
  } catch (error) {
    return res.status(500).json({
      error: `🚀 ~ file: productController.js:129 ~ addToCartProductController ~ error: 
            ${error}`,
    });
  }

  try {
    const data = await CartItem.create({
      ...cartData,
      userId: userId,
    });

    if (!data) {
      return res.status(500).json({ msg: "CartProduct data is not updated" });
    }
    return res.status(200).json({ data, msg: "prodcut is added in your cart" });
  } catch (error) {
    return res.status(500).json({
      msg: `🚀 ~ file: productController.js:147 ~ addToCartProductController ~ error:",
        ${error}`,
    });
  }
};

export const getToCartProductController = async (req, res) => {
  const userId = req.user?._id;
  try {
    const data = await CartItem.find({ userId });
    // console.log(data);
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

export const editProductController = async (req, res) => {
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
  // console.log(_id); // i am getting this id 656720b8ee1e429f6de5c1c4
  const objectId = new ObjectId(_id);
  try {
    const data = await CartItem.findByIdAndDelete({ _id: objectId });
    if (!data) {
      return res.status(500).send("product is not found in database");
    }
    return res.status(200).send("product is deleted successfully");
  } catch (error) {
    return res
      .status(500)
      .send(`some error occured in product delete api ${error}`);
  }
};

// order controller

export const OrderProductController = async (req, res) => {
  const orderData = req.body;
  const userId = orderData?.[0]?.userId;
  const date = Date.now();
  orderData?.forEach((val, index) => {
    delete val?.userId;
    delete val?._id;
    val.date = date;
  });

  try {
    const orderExists = await order.find({ userId });
    console.log(
      "🚀 ~ file: productController.js:228 ~ OrderProductController ~ orderExists:",
      orderExists
    );

    if (orderExists.length > 0) {
      const _id = orderExists[0]?._id;
      const productsAll = [...orderExists[0]?.products, ...orderData];

      console.log(
        "🚀 ~ file: productController.js:231 ~ OrderProductController ~ productsAll:",
        productsAll
      );
      const update = await order.findByIdAndUpdate(
        { _id },
        { products: productsAll },
        { new: true }
      );
      if (!update) {
        return res.status(500).json({
          msg: "Product not ordered some error occured",
          status: false,
        });
      }

      console.log(
        "🚀 ~ file: productController.js:234 ~ OrderProductController ~ update:",
        update?.products?.length
      );
      return res.status(200).json({
        update,
        msg: "new Product ordered successfully",
        status: true,
      });
    }

    const data = await order.create({ userId, products: orderData });
    console.log(data);
    if (!data) {
      return res
        .status(500)
        .json({ msg: "Product not ordered some error occured", status: true });
    }
    return res
      .status(200)
      .json({ data, msg: "Product ordered successfully", status: true });
  } catch (error) {
    return res.status(500).json({
      msg: `some error occured in product api ${error}`,
      status: true,
    });
  }
};

export const getOrderProductController = async (req, res) => {
  const userId = req.user?._id;
  console.log(
    "🚀 ~ file: productController.js:273 ~ getOrderProductController ~ userId:",
    userId
  );
  try {
    const data = await order.find({ userId });
    const userData = await order.Users({ _id: userId });

    const responseData = { ...data, ...userData };

    console.log(data);
    if (!data) {
      return res
        .status(500)
        .json({ status: false, msg: "order data is not present" });
    }
    return res
      .status(200)
      .json({ responseData, status: true, msg: "order data is present" });
  } catch (error) {
    return res
      .status(500)
      .send(
        "🚀 ~ file: productController.js:281 ~ getOrderProductController ~ error:",
        error
      );
  }
};

// order controller
