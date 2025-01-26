import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.jpg";

const Nav = () => {
  const navigate = useNavigate;
  const auth = localStorage.getItem("user");
  const { name } = JSON.parse(auth);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signUp");
  };
  return (
    <div className="navWrapper">
      {auth ? (
        <>
          <img
            src={logo}
            alt="logo"
            height={40}
            width={40}
            style={{ borderRadius: "50%" }}
          />
          <Link to={"/"} className="navItem">
            Home
          </Link>
          <Link to={"/add"} className="navItem">
            Add Product
          </Link>
          <Link to={"/update"} className="navItem">
            Update Product
          </Link>
          <Link to={"/profile"} className="navItem">
            Profile
          </Link>
          <Link to={"/signUp"} className="navItem" onClick={handleLogout}>
            Logout ({name})
          </Link>
        </>
      ) : (
        <>
          <Link to={"/signUp"} className="navItem">
            Sign up
          </Link>{" "}
          <Link to={"/login"} className="navItem">
            Login
          </Link>
        </>
      )}
    </div>
  );
};

export default Nav;
