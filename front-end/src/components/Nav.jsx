import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate;
  const auth = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signUp");
  };
  return (
    <div className="navWrapper">
      <Link to={"/"} className="navItem">
        Homepage
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
      {/* {auth ? (
        <Link to={"/signUp"} className="navItem" onClick={handleLogout}>
          Logout
        </Link>
      ) : (
        <Link to={"/signUp"} className="navItem">
          Sign up
        </Link>
      )} */}

      {auth ? (
        <Link to={"/signUp"} className="navItem" onClick={handleLogout}>
          Logout
        </Link>
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
