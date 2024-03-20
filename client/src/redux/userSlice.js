import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";


const initialState = {
  userData: [],
  isLoading: false,
  error: null,
};

export const loginUserAsync = createAsyncThunk(
  "user/loginUserAsync",
  async (data) => {
    try {
      const apiData = await fetch("http://localhost:3001/user/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const response = await apiData.json();

      if (!response?.token) {
        console.log(
          "🚀 ~ file: Login.jsx:23 ~ onSubmit: ~ response.token: token is not created",
          !response?.token
        );
        alert("Token is not created");
        return;
      }

      if (response?.status) {
        Cookies.set("token", response?.token);
        const userJsonData = JSON.stringify(response?.userData);
        Cookies.set("user", userJsonData);
        alert(response?.msg);
        return response?.userData;
      }
    } catch (error) {
      console.log("🚀 ~ file: Login.jsx:22 ~ onSubmit: ~ error:", error);
    }
  }
);

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
        Authorization: Cookies.get("token"),
      },
    });
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
    try {
      const response = await fetch(
        `http://localhost:3001/user/shippingAddress`,
        {
          method: "PUT",
          body: JSON.stringify(address),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: Cookies.get("token"),
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
  reducer: {
    resetState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addUserAsync.fulfilled, (state, action) => {
      state.userData.shippingAddress = [...action.payload.data.shippingAddress];
      state.isLoading = false;
    });
    builder.addCase(addUserAsync.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addUserAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    });
    builder.addCase(updateShippingAddressAsync.fulfilled, (state, action) => {
      state.userData.shippingAddress = [...action.payload.data.shippingAddress];
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
      console.log(action.payload);
      state.userData = action.payload.user;
      state.userData.shippingAddress = [...action.payload.user.shippingAddress];
      state.isLoading = false;
    });
    builder.addCase(getUserAsync.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUserAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    });
    builder.addCase(loginUserAsync.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.isLoading = false;
    });
    builder.addCase(loginUserAsync.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginUserAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    });
  },
});

export default userSlice.reducer;

// create a selector
export const user = (state) => state.user.userData;
export const getUser = (state) => state.user.userData;
export const shippingAdd = (state) => state.user.userData.shippingAddress;

export const { resetState } = userSlice.actions;
