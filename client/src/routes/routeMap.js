import { PATHS } from "./paths";
import Home from "../home/Home";
import LoginSignup from "../Login_Signup/Login_Signup";
import About from "../about/About";
import Main_Products_page from "../AllProduct/Main_Products_page";
import contact from "../contact/Contact";
import Single_page from "../Single_page/Single_page";
import Add_to_cart from "../Add_Cart/Add_To_Cart";

export const routeMap = [
  {
    id: "root",
    path: PATHS.root,
    isProtected: true,
    Element: Home,
  },
  {
    id: "LoginSignup",
    path: PATHS.login_signup,
    isProtected: false,
    Element: LoginSignup,
  },
  {
    id: "main_products_page",
    path: PATHS.main_products_page,
    isProtected: true,
    Element: Main_Products_page,
  },
  {
    id: "contact",
    path: PATHS.contact,
    isProtected: true,
    Element: contact,
  },
  {
    id: "about",
    path: PATHS.about,
    isProtected: true,
    Element: About,
  },
  {
    id: "Single_page",
    path: PATHS.singleproduct,
    isProtected: true,
    Element: Single_page,
  },
  {
    id: "Add_to_cart",
    path: PATHS.add_to_cart,
    isProtected: true,
    Element: Add_to_cart,
  }
];
