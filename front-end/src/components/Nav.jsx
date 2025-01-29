import { Link } from "react-router-dom";
import logo from "../images/logo.jpg";
import { useSelector } from "react-redux";
import profile from '../images/profile.jpg'

const Nav = () => {
  const isLoggedIn = useSelector((state) => state.loggedIn.status);

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
            <img
              src={profile}
              alt="profile pic"
              width={40}
              height={40}
              style={{ borderRadius: "50%" }}
            />
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
