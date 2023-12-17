import Main_Products_page from "../pages/AllProduct/Main_Products_page";
import Home from "../pages/home/Home";
import { PATHS } from "./paths";
import Contact from '../pages/contact/Contact';
import Single_page from '../pages/Single_page/Single_page';
import Forgatepass from "../pages/Forgate_password/Forgatepass";
import Password_reset from '../pages/Forgate_password/Password_reset';
import Order from "../pages/order/Order";
import Login_Signup from "../pages/Login_Signup/Login_Signup";
import Add_To_Cart from "../pages/Add_Cart/Add_To_Cart";
import Setting from "../pages/Setting/Setting";
import AdminHome from './../admin/Pages/AdminHome';


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
    Element: Login_Signup,
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
    Element: Add_To_Cart,
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

  // admin Routes
  {
    id: "adminHome",
    path: PATHS.adminHome,
    isProtected: true,
    Element: AdminHome,
  },
];
