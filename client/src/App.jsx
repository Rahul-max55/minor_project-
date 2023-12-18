import "./App.css";
import { BrowserRouter } from "react-router-dom";
import NoteContext from "./Contexts/NoteContext";
import "./input.css";
import FilterNoteContext from "./pages/AllProduct/Filter_Context/FilterNoteContext";
import { Loading } from "./components/Loading/Loading";
import { useEffect, useState } from "react";
import axios from "axios";
import FETCH_WRAPPER from "./Api";
import Cookies from "js-cookie";
import { CartNoteContext } from "./pages/Add_Cart/context/CartNoteContext";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  // console.log("🚀 ~ file: App.jsx:16 ~ App ~ isLoading:", isLoading);

  useEffect(() => {
    const requestInterceptor = FETCH_WRAPPER.interceptors.request.use(
      (config) => {
        const token = Cookies.get("token");
        // console.log("Request interceptor fired");
        setIsLoading(true);
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

  let accessType = "admin";

  return (
    <>
      {accessType === "admin" ? (
        <BrowserRouter>
          <Loading isLoading={isLoading} />
          <AdminRoutes />
        </BrowserRouter>
      ) : (
        <NoteContext>
          <FilterNoteContext>
            <CartNoteContext>
              <BrowserRouter>
                <Loading isLoading={isLoading} />
                <UserRoutes />
              </BrowserRouter>
            </CartNoteContext>
          </FilterNoteContext>
        </NoteContext>
      )}
    </>
  );
};

export default App;
