import "./App.css";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import { BrowserRouter } from "react-router-dom";
import NoteContext from "./Contexts/NoteContext";

import FilterNoteContext from "./Filter_Context/FilterNoteContext";
import { AppRoutes } from "./routes/AppRoutes";
import { Loading } from "./Loading/Loading";
import { useEffect, useState } from "react";
import axios from "axios";
import FETCH_WRAPPER from "./Api";
import Cookies from "js-cookie";
import { CartNoteContext } from "./Add_Cart/context/CartNoteContext";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  // console.log("🚀 ~ file: App.jsx:16 ~ App ~ isLoading:", isLoading);

  useEffect(() => {
    const requestInterceptor = FETCH_WRAPPER.interceptors.request.use(
      (config) => {
        const token = Cookies.get("token");
        // console.log("Request interceptor fired");
        setIsLoading(true);
        console.log(token);
        config.headers.authorization = token;
        return config;
      },
      (error) => {
        // console.error("Request interceptor error:", error);
        // alert("🚀 ~ file: App.jsx:31 ~ useEffect ~ error:", error);
        setIsLoading(false);
        return Promise.reject(error);
      }
    );

    const responseInterceptor = FETCH_WRAPPER.interceptors.response.use(
      (response) => {
        // console.log("Response interceptor fired");
        setIsLoading(false);
        return response;
      },
      (error) => {
        setIsLoading(false);
        // console.error("Response interceptor error:", error);
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return (
    <>
      <NoteContext>
        <FilterNoteContext>
          <CartNoteContext>
            <BrowserRouter>
              <Navbar />
              <Loading isLoading={isLoading} />
              <AppRoutes />
              <Footer />
            </BrowserRouter>
          </CartNoteContext>
        </FilterNoteContext>
      </NoteContext>
    </>
  );
};

export default App;
