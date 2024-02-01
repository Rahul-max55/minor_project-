import "./App.css";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import { BrowserRouter } from "react-router-dom";
import NoteContext from "./Contexts/NoteContext";
import { Provider } from "react-redux";
import FilterNoteContext from "./Filter_Context/FilterNoteContext";
import Cart_Note_Context from "./Add_Cart/Cart_Context/Cart_Note_Context";
import { AppRoutes } from "./routes/AppRoutes";
import { store } from "./redux/store";

const App = () => {
  return (
    <>
      <Provider store={store}>
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
      </Provider>
    </>
  );
};

export default App;
