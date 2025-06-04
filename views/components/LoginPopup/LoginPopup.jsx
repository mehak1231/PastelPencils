import React, { useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import emailjs from "@emailjs/browser";
import "./LoginPopup.css";

// PopupMessage Component
const PopupMessage = ({ message, onClose }) => (
  <div className="popup-message">
    <div className="popup-content">
      <p>{message}</p>
      <button onClick={onClose}>OK</button>
    </div>
  </div>
);

const LoginPopup = ({ setShowLogin }) => {
  const { setToken, setUser } = useContext(StoreContext);

  const [isSignUp, setIsSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [popupMsg, setPopupMsg] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dob: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isSignUp
      ? "http://localhost:5000/api/users/register"
      : "http://localhost:5000/api/users/login";

    const body = isSignUp
      ? {
          username: formData.username,
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          phone: formData.phone,
          dob: formData.dob,
        }
      : {
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        };

    if (isSignUp && formData.password !== formData.confirmPassword) {
      setPopupMsg("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!data.success) {
        setPopupMsg(data.message || "Operation failed");
        return;
      }

      if (isSignUp) {
        setPopupMsg("Sign up successful! Please login.");
        setIsSignUp(false);
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        setShowLogin(false);
      }
    } catch (error) {
      console.error("Request error:", error);
      setPopupMsg("Something went wrong. Please try again.");
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      setPopupMsg("Please enter your email.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/users/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await res.json();

      if (!data.success) {
        setPopupMsg(data.message || "Something went wrong.");
        return;
      }

      const templateParams = {
        email: forgotEmail,
        link: `http://localhost:3000/reset-password/${data.token}`,
      };

      await emailjs.send(
        "service_pz7in8j",      // Replace with your EmailJS Service ID
        // "service_e3cdkdb",
        "template_3p45l2f",     // Replace with your EmailJS Template ID
        // "template_mksrg0q",
        templateParams,
        "keh_ttRHQpd7nX9U5"    // Replace with your EmailJS Public Key
        // "paSiA6Z7oAKj2ZXYm"
      );

      setPopupMsg("Password reset link sent to your email 📩");
      setShowForgotPassword(false);
      setForgotEmail("");
    } catch (err) {
      console.error("EmailJS error:", err);
      setPopupMsg("Failed to send reset link.");
    }
  };

  return (
    <div className="login-popup">
      <div className="login-popup-content">
        <button className="close-button" onClick={() => setShowLogin(false)}>✖</button>
        <h2>{isSignUp ? "Sign Up" : "Login"}</h2>

        {!showForgotPassword ? (
          <>
            <form onSubmit={handleSubmit}>
              {isSignUp && (
                <>
                  <input
                    type="text"
                    name="username"
                    placeholder="Name"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    required
                  />
                </>
              )}

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              {isSignUp && (
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              )}
              <button type="submit" className="submit-button">
                {isSignUp ? "Sign Up" : "Login"}
              </button>
            </form>

            {!isSignUp && (
              <p className="forgot-password" onClick={() => setShowForgotPassword(true)}>
                Forgot your password?
              </p>
            )}

            <p>
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <span onClick={() => setIsSignUp(!isSignUp)} style={{ cursor: "pointer" }}>
                {isSignUp ? "Login" : "Sign Up"}
              </span>
            </p>
          </>
        ) : (
          <div className="forgot-password-form">
            <h4>Reset your password</h4>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              required
            />
            <button onClick={handleForgotPassword}>Send Reset Link</button>
            <p
              onClick={() => setShowForgotPassword(false)}
              style={{ cursor: "pointer", marginTop: "10px", color: "blue" }}
            >
              🔙 Back to login
            </p>
          </div>
        )}

        {/* Render Popup Message */}
        {popupMsg && <PopupMessage message={popupMsg} onClose={() => setPopupMsg("")} />}
      </div>
    </div>
  );
};

export default LoginPopup;

