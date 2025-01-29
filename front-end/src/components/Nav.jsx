import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.jpg";
import { useSelector } from "react-redux";

const Nav = () => {
  const isLoggedIn = useSelector((state) => state.loggedIn.status);
  const navigate = useNavigate;
  const auth = localStorage.getItem("user");
  const { name } = JSON.parse(auth) ?? { name: "Guest" };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signUp");
  };

  return (
    <div className="navWrapper">
      {isLoggedIn ? (
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
          <Link to={"/addProduct"} className="navItem">
            Add Product
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
