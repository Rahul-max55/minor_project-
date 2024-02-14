import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllProductsAsync = createAsyncThunk(
  "products/fetchAllProductsAsync",
  async (page) => {
    const response = await fetch(`http://localhost:3000/products?_page=${page}`);
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

export const filterProductAsync = createAsyncThunk(
  "products/filterProductAsync",
  async (filterVal) => {
    let queryPara = "";
    for (let x in filterVal) {
      let modifiedArray = filterVal[x].join("&");
      // console.log("🚀 ~ modifiedArray:", modifiedArray);
      // console.log("🚀 ~ x:", filterVal[x]);
      queryPara += `${x}=${modifiedArray}`;
    }
    console.log("🚀 ~ queryPara:", queryPara);
    console.log("http://localhost:3000/products?" + queryPara);
    //TODO: We need to create api for filter "http:///localhost:3000/products?category=mobile,laptops&brands=hp,apple"
    const response = await fetch(
      "http:///localhost:3000/products?" + queryPara
    );
    return response.json();
  }
);

const initialState = {
  products: [],
  colors: [],
  brands: [],
  category: [],
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
    builder.addCase(filterProductAsync.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    });
    builder.addCase(filterProductAsync.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(filterProductAsync.rejected, (state, action) => {
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
