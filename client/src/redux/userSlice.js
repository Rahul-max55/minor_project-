import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  shippingAddress: [],
  isLoading: false,
  error: null,
};

// ACCOUNT CREATION CODE
export const addUserAsync = createAsyncThunk(
  "user/addUserAsync",
  async (userData) => {
    try {
      const allUsers = await fetch(`http://localhost:3000/user`);
      const existingUser = allUsers.some(
        (val, index) => val.email === userData.email
      );
      if (!existingUser) {
        const response = await fetch(`http://localhost:3000/user`, {
          method: "POST",
          body: JSON.stringify(userData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        alert("account created successfully");
        return await response.json();
      } else {
        alert("User is already exists please use another email");
      }
    } catch (error) {
      console.log(error);
    }
  }
);
//END ACCOUNT CREATION CODE

// GET USER
export const getUserAsync = createAsyncThunk("user/getUserAsync", async () => {
  try {
    const user = await fetch(`http://localhost:3001/user/getUser`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: localStorage.getItem("token"),
      },
    });
    console.log("🚀 ~ user:", user);
    if (!user) {
      console.log("user not exists");
    }
    return await user.json();
  } catch (error) {
    console.log(error);
  }
});
//GET USER

export const updateShippingAddressAsync = createAsyncThunk(
  "user/updateShippingAddressAsync",
  async (address) => {
    console.log("🚀 ~ address:", address)
    try {
      const response = await fetch(
        `http://localhost:3001/user/shippingAddress`,
        {
          method: "PUT",
          body: JSON.stringify(address),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateShippingAddressAsync.fulfilled, (state, action) => {
      console.log(action.payload);
      state.shippingAddress = [...action.payload.data.shippingAddress];
      state.isLoading = false;
    });
    builder.addCase(updateShippingAddressAsync.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateShippingAddressAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    });
    builder.addCase(getUserAsync.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUserAsync.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUserAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    });
  },
});

export default userSlice.reducer;

// create a selector
export const user = (state) => state.user.user;
export const getUser = (state) => state.user.user;
export const shippingAdd = (state) => state.user.shippingAddress;
