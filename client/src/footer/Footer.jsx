import React, { useContext, useEffect, useRef } from "react";
import "./Footer.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Create_context } from "../Contexts/CreateContext";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="divs_footer">
          <div className="left_info ">
            <h4>We provides best quality Clothes and services</h4>

            <h5>Our Services In Cities</h5>

            <ul>
              <li>Indore</li>
              <li>Pune</li>
              <li>Mumbai</li>
              <li>Bangalore</li>
            </ul>
          </div>
          <div className="right_info">
            <h4>Follow Us</h4>
            <div>
              <LinkedInIcon />
              <TelegramIcon />
              <YouTubeIcon />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
