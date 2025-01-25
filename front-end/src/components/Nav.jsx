import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <li>
        <Link to={"/"}>Homepage</Link>
      </li>
      <li>
        <Link to={"/add"}>Add Product</Link>
      </li>
      <li>
        <Link to={"/update"}>Update Product</Link>
      </li>
      <li>
        <Link to={"/logout"}>Logout</Link>
      </li>
      <li>
        <Link to={"/profile"}>Profile</Link>
      </li>
    </div>
  );
};

export default Nav;
