import { PATHS } from "./paths";
import Home from "../home/Home";
import LoginSignup from "../Login_Signup/Login_Signup";
import About from "../about/About";
import Main_Products_page from "../AllProduct/Main_Products_page";
import Contact from "../contact/Contact";
import Single_page from "../Single_page/Single_page";
import Add_to_cart from "../Add_Cart/Add_To_Cart";
import Forgatepass from "../Forgate_password/Forgatepass";
import Password_reset from "../Forgate_password/Password_reset";
import Setting from "../Setting/Setting";
import { pageNotFound } from "../404/404";
import Order from "../order/Order";

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
    id: "Password_reset",
    path: PATHS.password_reset,
    isProtected: false,
    Element: Password_reset,
  },
  {
    id: "setting",
    path: PATHS.setting,
    isProtected: true,
    Element: Setting,
  },
  {
    id: "order",
    path: PATHS.order,
    isProtected: true,
    Element: Order,
  },
];
