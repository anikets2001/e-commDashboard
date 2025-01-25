import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="navWrapper">
      <Link to={"/"} className="navItem">Homepage</Link>
      <Link to={"/add"} className="navItem">Add Product</Link>
      <Link to={"/update"} className="navItem">Update Product</Link>
      <Link to={"/logout"} className="navItem">Logout</Link>
      <Link to={"/profile"} className="navItem">Profile</Link>
      <Link to={"/signUp"} className="navItem">Sign up</Link>

    </div>
  );
};

export default Nav;
