import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllProductsAsync = createAsyncThunk(
  "products/fetchAllProductsAsync",
  async ({ pageObj, filterVal }) => {
    console.log("🚀 ~ pageObj:", pageObj);
    // console.log("🚀 ~ filterVal:", filterVal);
    // console.log("🚀 ~ page:", pageObj);
    let queryPara = "";
    // filter values using category and brands
    //TODO: We need to create api for filter "http://localhost:3000/products?category=laptops&category=fragrances&category=skincare&brands=OPPO&brands=Huawei&" this api work only one value
    for (let key in filterVal) {
      for (let value of filterVal[key]) {
        queryPara += `${key}=${value}&`;
      }
    }
    // filter values using category and brands

    // pagination query
    for (let key in pageObj) {
      queryPara += `${key}=${pageObj[key]}&`;
    }
    // pagination query

    // // sorting query
    // TODO: you create your own api for sorting {sort:"asc" , field:"name"}
    // for (let key in sorting) {
    //   queryPara += `${key}=${sorting[key]}`;
    // }
    // // sorting query

    // console.log(`http://localhost:3000/products?${queryPara}`);

    const response = await fetch(`http://localhost:3000/products?${queryPara}`);
    return response.json();
  }
);

export const fetchAllColorsAsync = createAsyncThunk(
  "products/fetchAllColorsAsync",
  async () => {
    const response = await fetch("http://localhost:3000/colors");
    return response.json();
  }
);
export const fetchAllCategoryAsync = createAsyncThunk(
  "products/fetchAllCategoryAsync",
  async () => {
    const response = await fetch("http://localhost:3000/category");
    return response.json();
  }
);

export const fetchAllBrandsAsync = createAsyncThunk(
  "products/fetchAllBrandsAsync",
  async () => {
    const response = await fetch("http://localhost:3000/brand");
    return response.json();
  }
);

export const fetchSingleProductDataAsync = createAsyncThunk(
  "products/fetchSingleProductDataAsync",
  async (id) => {
    const response = await fetch(`http://localhost:3000/products/${id}`);
    return response.json();
  }
);

export const addCartDataAsync = createAsyncThunk(
  "cart/addCartDataAsync",
  async (data) => {
    try {
      const response = await fetch(`http://localhost:3000/cart/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchCartDataAsync = createAsyncThunk(
  "cart/fetchCartDataAsync",
  async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/cart?userId=${userId}`
      );
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteCartDataAsync = createAsyncThunk(
  "cart/deleteCartDataAsync",
  async (id) => {
    console.log(id);
    try {
      const response = await fetch(`http://localhost:3000/cart/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }
);

// update quantity of the product
export const updateCartDataAsync = createAsyncThunk(
  "cart/updateCartDataAsync",
  async (newData) => {
    try {
      const response = await fetch(
        `http://localhost:3000/cart/${newData?.id}`,
        {
          method: "PUT",
          body: JSON.stringify(newData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }
);

// after checkout we can confirm our order
export const confirmOrderDataAsync = createAsyncThunk(
  "cart/confirmOrderDataAsync",
  async (data) => {
    try {
      const response = await fetch(`http://localhost:3000/orders`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }
);
export const getConfirmOrderDataAsync = createAsyncThunk(
  "cart/getConfirmOrderDataAsync",
  async () => {
    try {
      const response = await fetch(`http://localhost:3000/orders`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  products: [],
  singleProduct: {},
  colors: [],
  brands: [],
  category: [],
  cart: [],
  orders: [],
  isLoading: false,
  isError: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchAllProductsAsync.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllProductsAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    });
    builder.addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
      state.brands = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchAllBrandsAsync.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllBrandsAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    });
    builder.addCase(fetchAllCategoryAsync.fulfilled, (state, action) => {
      state.category = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchAllCategoryAsync.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllCategoryAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    });
    builder.addCase(fetchAllColorsAsync.fulfilled, (state, action) => {
      state.colors = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchAllColorsAsync.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllColorsAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    });
    builder.addCase(fetchSingleProductDataAsync.fulfilled, (state, action) => {
      state.singleProduct = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchSingleProductDataAsync.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSingleProductDataAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    });
    builder.addCase(addCartDataAsync.fulfilled, (state, action) => {
      state.cart = [...state.cart, action.payload];
      state.isLoading = false;
    });
    builder.addCase(addCartDataAsync.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addCartDataAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    });
    builder.addCase(fetchCartDataAsync.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchCartDataAsync.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCartDataAsync.rejected, (state, action) => {
      state.isError = action.error;
      state.isLoading = false;
    });
    builder.addCase(deleteCartDataAsync.fulfilled, (state, action) => {
      const { id } = action.payload;
      const indexVal = state.cart.findIndex((val, index) => val.id === id);
      state.cart.splice(indexVal, 1);
      state.isLoading = false;
    });
    builder.addCase(deleteCartDataAsync.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCartDataAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    });
    builder.addCase(updateCartDataAsync.fulfilled, (state, action) => {
      const { id } = action.payload;
      state.cart = state.cart?.map((val) =>
        val.id === id ? action.payload : val
      );
      state.isLoading = false;
    });
    builder.addCase(updateCartDataAsync.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateCartDataAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    });
    builder.addCase(confirmOrderDataAsync.fulfilled, (state, action) => {
      state.orders = action.payload;
      alert("Order Confirmed")
      state.isLoading = false;
    });
    builder.addCase(confirmOrderDataAsync.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(confirmOrderDataAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    });
    builder.addCase(getConfirmOrderDataAsync.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getConfirmOrderDataAsync.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getConfirmOrderDataAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    });
  },
});

export default productSlice.reducer;

// create a selector
export const allProducts = (state) => state.product.products;
export const allColors = (state) => state.product.colors;
export const allBrands = (state) => state.product.brands;
export const allCategory = (state) => state.product.category;
export const singleProduct = (state) => state.product.singleProduct;
export const cartData = (state) => state.product.cart;
export const orders = (state) => state.product.orders;
