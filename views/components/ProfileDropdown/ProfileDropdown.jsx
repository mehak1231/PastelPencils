import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import "./ProfileDropdown.css";

const ProfileDropdown = ({ setShowLogin, setShowDropdown }) => {
  const { token, setToken, setUser, user } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setUser(null);
    setShowDropdown(false);
    navigate("/");
  };

  const handleNavigate = (path) => {
    navigate(path);
    setShowDropdown(false);
  };

  if (!token) {
    return (
      <div className="profile-dropdown">
        <div className="dropdown-welcome">
          <p>Welcome</p>
          <span>To access account and manage orders</span>
          <button
            className="login-btn"
            onClick={() => {
              setShowLogin(true);
              setShowDropdown(false);
            }}
          >
            LOGIN / SIGNUP
          </button>
        </div>
        <ul className="dropdown-links">
          <li onClick={() => handleNavigate("/orders")}>Orders</li>
          <li onClick={() => handleNavigate("/wishlist")}>Wishlist</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="profile-dropdown">
      <div className="dropdown-welcome">
        <p><strong>Hello {user?.username || user?.email}</strong></p>
        <span>{user?.phone || ""}</span>
      </div>
      <ul className="dropdown-links">
        <li onClick={() => handleNavigate("/orders")}>Orders</li>
        <li onClick={() => handleNavigate("/wishlist")}>Wishlist</li>
        <li className="logout" onClick={logout}>
          Logout
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;

