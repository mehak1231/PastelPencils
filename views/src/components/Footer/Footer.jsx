// import React from "react";
// import "./Footer.css";
// import { images } from "../../images/images";

// const Footer = () => {
//   return (
//     <div className="footer" id="footer">
//       <div className="footer-content">
//         <div className="footer-content-left">
//           <img src={images.logo} alt="" />
//           <p>
//             Dive into a world of adorable stationery, featuring charming
//             notebooks, whimsical pens, cute stickers, and unique accessories—all
//             designed to add a touch of joy and creativity to your day!
//           </p>
//           <div className="footer-social-icons">
//             <img src={images.facebook_icon} alt="" />
//             <img src={images.twitter_icon} alt="" />
//             <img src={images.linkedin_icon} alt="" />
//           </div>
//         </div>

//         <div className="footer-content-center">
//           <h2>PASTEL PENCILS</h2>
//           <ul>
//             <li>Home</li>
//             <li>About us</li>
//           </ul>
//         </div>

//         <div className="footer-content-right">
//           <h2>GET IN TOUCH</h2>
//           <ul>
//             <li>+1234567890</li>
//             <li>contact@pastel.com</li>
//           </ul>
//         </div>
//       </div>
//       <hr />
//       <p className="footer-copyright">
//         Copyright 2024 © pastelPencils.com -All Right Reserved.
//       </p>
//     </div>
//   );
// };

// export default Footer;



import React from "react";
import "./Footer.css";
import { images } from "../../images/images";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        {/* Left Section */}
        <div className="footer-content-left">
          <img src={images.logo} alt="Pastel Pencils Logo" />
          <p>
            Dive into a world of adorable stationery, featuring charming
            notebooks, whimsical pens, cute stickers, and unique accessories—all
            designed to add a touch of joy and creativity to your day!
          </p>
          <div className="footer-social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={images.facebook_icon} alt="Facebook" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <img src={images.twitter_icon} alt="Twitter" />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src={images.linkedin_icon} alt="LinkedIn" />
            </a>
          </div>
        </div>

        {/* Center Section */}
        <div className="footer-content-center">
          <h2>PASTEL PENCILS</h2>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About us</a>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>
              <a href="tel:+1234567890">+1234567890</a>
            </li>
            <li>
              <a href="mailto:contact@pastel.com">contact@pastel.com</a>
            </li>
          </ul>
        </div>
      </div>

      <hr />

      <p className="footer-copyright">
        Copyright 2024 © pastelPencils.com - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
