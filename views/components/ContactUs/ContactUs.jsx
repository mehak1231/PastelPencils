import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./ContactUs.css";

// PopupMessage Component
const PopupMessage = ({ message, onClose }) => (
  <div className="popup-message">
    <div className="popup-content">
      <p>{message}</p>
      <button onClick={onClose}>OK</button>
    </div>
  </div>
);

const Contact = () => {
  const form = useRef();
  const [popupMsg, setPopupMsg] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_e3cdkdb",
        "template_mksrg0q",
        form.current,
        "paSiA6Z7oAKj2ZXYm"
      )
      .then(
        (result) => {
          console.log(result.text);
          setPopupMsg("Message sent successfully 💌");
          form.current.reset(); // Clear form after successful send
        },
        (error) => {
          console.log(error.text);
          setPopupMsg("Oops! Something went wrong 🥲");
        }
      );
  };

  return (
    <div className="contact-wrapper">
      <div className="contact-container">
        <h2 className="contact-title">Get in Touch ✨</h2>
        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <label>Name</label>
          <input
            type="text"
            name="user_name"
            required
            placeholder="Enter your name"
          />

          <label>Email</label>
          <input
            type="email"
            name="user_email"
            required
            placeholder="Enter your email"
          />

          <label>Message</label>
          <textarea name="message" required placeholder="Enter your message" />

          <input type="submit" value="Send 💌" />
        </form>
      </div>

      <div className="contact-info">
        <h2>
          Customer delight is our heartbeat at <span>Pastel Pencils ❤</span>
        </h2>
        <p>
          <strong>Got questions?</strong> Reach out to our care team by calling{" "}
          <a href="tel:+9193561XXXXX">+91 93561XXXXX</a>, drop us a mail at{" "}
          <a href="mailto:care@pastelpencils.com">care@pastelpencils.com</a> or
          chat with us here.
        </p>
        <p>
          We're available from <strong>9 AM to 9 PM, all week.</strong>
        </p>
        <br />

        <p>
          <strong>Join Our Team:</strong> We'd love to have you on board!
          <br />
          Reach out to us at{" "}
          <a href="mailto:hr@pastelpencils.com">hr@pastelpencils.com</a> for any
          hiring-related queries.
        </p>
        <br />

        <p>
          <strong>Gift with Elegance:</strong> Elevate your corporate gifting
          experience with Pastel Pencils.
          <br />
          Connect with us at{" "}
          <a href="mailto:corporate@pastelpencils.com">
            corporate@pastelpencils.com
          </a>{" "}
          to make every gesture memorable.
        </p>
        <br />

        <p>
          <strong>Let's Team Up:</strong> For PR/Media/Collabs, reach out at{" "}
          <a href="mailto:collaboration@pastelpencils.com">
            collaboration@pastelpencils.com
          </a>
          .
        </p>
        <br />

        <p>
          <strong>Our Corporate Office:</strong>
          <br />
          Office No 501/502/XYZ/504/ABC(A), 5th Floor, ABX 84,
          <br />
          Plot 1, Lane Z, Park Annexe, Pune, Maharashtra 41XXXX.
        </p>
      </div>

      {/* Custom Popup Message */}
      {popupMsg && <PopupMessage message={popupMsg} onClose={() => setPopupMsg("")} />}
    </div>
  );
};

export default Contact;

