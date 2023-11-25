import "./App.css";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import { BrowserRouter } from "react-router-dom";
import NoteContext from "./Contexts/NoteContext";

import FilterNoteContext from "./Filter_Context/FilterNoteContext";
import Cart_Note_Context from "./Add_Cart/Cart_Context/Cart_Note_Context";
import { AppRoutes } from "./routes/AppRoutes";

const App = () => {
  return (
    <>
      <NoteContext>
        <FilterNoteContext>
          <Cart_Note_Context>
            <BrowserRouter>
              <Navbar />
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
