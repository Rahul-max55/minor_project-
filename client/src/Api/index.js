import axios from "axios";
import Cookies from "js-cookie";


// Check if localStorage is available (in a browser environment)
// Check if the token exists in localStorage
// Create an axios instance with the token
const FETCH_WRAPPER = axios.create({
  baseURL: "http://localhost:3001/user/",
  headers: {
    Accept: "application/json",
  },
});

export default FETCH_WRAPPER;
