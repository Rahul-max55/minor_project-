import axios from "axios";

let FETCH_WRAPPER;

// Check if localStorage is available (in a browser environment)
if (typeof localStorage !== "undefined") {
  const token = localStorage.getItem("token");
  // Check if the token exists in localStorage
  if (token) {
    // Create an axios instance with the token
    FETCH_WRAPPER = axios.create({
      baseURL: "http://localhost:3001/user/",
      timeout: 5000,
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    });
  } else {
    // Handle the case where the 'token' key is not found in localStorage
    console.error("Token not found in localStorage");
  }
} else {
  // Handle the case where localStorage is not available (Node.js environment, for example)
  console.error("localStorage is not available in this environment");
}

export default FETCH_WRAPPER;
