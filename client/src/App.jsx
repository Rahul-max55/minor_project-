import "./App.css";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import { BrowserRouter } from "react-router-dom";
import NoteContext from "./Contexts/NoteContext";

import FilterNoteContext from "./Filter_Context/FilterNoteContext";
import Cart_Note_Context from "./Add_Cart/Cart_Context/Cart_Note_Context";
import { AppRoutes } from "./routes/AppRoutes";
import { Loading } from "./Loading/Loading";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  


  
  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        console.log('Request interceptor fired');
        setIsLoading(true);
        return config;
      },
      (error) => {
        console.error('Request interceptor error:', error);
        setIsLoading(false);
        return Promise.reject(error);
      }
    );
    
   axios.interceptors.response.use(
      (response) => {
        console.log('Response interceptor fired');
        setIsLoading(false);
        return response;
      },
      (error) => {
        console.error('Response interceptor error:', error);
        setIsLoading(false);
        return Promise.reject(error);
      }
    );
    // axios.interceptors.request.use(
    //   (config) => {
    //     setIsLoading(true);
    //     return config;
    //   },
    //   (error) => {
    //     setIsLoading(false);
    //     return Promise.reject(error);
    //   }
    // );

    // axios.interceptors.response.use(
    //   (response) => {
    //     setIsLoading(false);
    //     return response;
    //   },
    //   (error) => {
    //     setIsLoading(false);
    //     return Promise.reject(error);
    //   }
    //   );
    }, []);
    
    console.log("🚀 ~ file: App.jsx:16 ~ App ~ isLoading:", isLoading)
  

  return (
    <>
      <NoteContext>
        <FilterNoteContext>
          <Cart_Note_Context>
            <BrowserRouter>
              <Navbar />
              {isLoading && <Loading />}
              <AppRoutes />
              <Footer />
            </BrowserRouter>
          </Cart_Note_Context>
        </FilterNoteContext>
      </NoteContext>
    </>
  );
};

export default App;
