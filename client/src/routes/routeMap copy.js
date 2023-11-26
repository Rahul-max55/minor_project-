import { PATHS } from "./paths";
import Home from "../home/Home";
import LoginSignup from "../Login_Signup/Login_Signup";
import About from "../about/About";
import Main_Products_page from "../AllProduct/Main_Products_page";
import Contact from "../contact/Contact";
import Single_page from "../Single_page/Single_page";
import Add_to_cart from "../Add_Cart/Add_To_Cart";
import Forgatepass from "../Forgate_password/Forgatepass";

export const routeMap = [
  {
    id: "Home",
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
    id: "Main_Products_page",
    path: PATHS.main_products_page,
    isProtected: true,
    Element: Main_Products_page,
  },
  {
    id: "Contact",
    path: PATHS.contact,
    isProtected: true,
    Element: Contact,
  },
  {
    id: "About",
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
  },
  {
    id: "Forgatepass",
    path: PATHS.forgatepass,
    isProtected: false,
    Element: Forgatepass,
  },
  {
    id: "Forgatepass",
    path: PATHS.forgatepass,
    isProtected: false,
    Element: Forgatepass,
  },
];
