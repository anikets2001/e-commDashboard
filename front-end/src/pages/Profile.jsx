import { MdOutlineLogout, MdDarkMode } from "react-icons/md";
import profile from "../images/profile.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CiLight } from "react-icons/ci";
import { darkTheme, lightTheme } from "../utils/themePalette";
import {
  userLoggedIn,
  toggleTheme,
} from "../redux/features/common/commonSlice";

const Profile = () => {
  const theme = useSelector((state) => state.common.theme);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = localStorage.getItem("user");
  const { name, email, _id } = JSON.parse(auth) ?? { name: "Guest" };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(userLoggedIn(false));
    navigate("/signUp");
  };

  const handleThemeChange = () => {
    if (theme === "light") {
      dispatch(toggleTheme("dark"));
    } else {
      dispatch(toggleTheme("light"));
    }
  };

  return (
    <div className="container">
      <div
        className="profile-container"
        style={{
          backgroundColor:
            theme === "dark"
              ? darkTheme.backgroundColor
              : lightTheme.backgroundColor,
        }}
      >
        <div className="profile-info">
          <img
            src={profile}
            alt="profile pic"
            className="profile-pic"
            style={{ borderRadius: "50%" }}
          />
        </div>
        <div className="settings-section">
          <div className="settings-item">
            <span
              style={{
                color: theme === "dark" ? darkTheme.color : lightTheme.color,
              }}
            >
              Dark mode
            </span>
            <button className="theme-btn" onClick={handleThemeChange}>
              {theme === "dark" ? (
                <CiLight
                  className="theme-icon"
                  style={{
                    color:
                      theme === "dark" ? darkTheme.color : lightTheme.color,
                  }}
                />
              ) : (
                <MdDarkMode
                  className="theme-icon"
                  style={{
                    color:
                      theme === "dark" ? darkTheme.color : lightTheme.color,
                  }}
                />
              )}
            </button>
          </div>
          <div className="settings-item">
            <span
              style={{
                color: theme === "dark" ? darkTheme.color : lightTheme.color,
              }}
            >
              Name:
            </span>
            <p
              style={{
                color: theme === "dark" ? darkTheme.color : lightTheme.color,
              }}
            >
              {name}
            </p>
          </div>
          <div className="settings-item">
            <span
              style={{
                color: theme === "dark" ? darkTheme.color : lightTheme.color,
              }}
            >
              email:
            </span>
            <p
              style={{
                color: theme === "dark" ? darkTheme.color : lightTheme.color,
              }}
            >
              {email}
            </p>
          </div>
          <div className="settings-item">
            <span
              style={{
                color: theme === "dark" ? darkTheme.color : lightTheme.color,
              }}
            >
              user id:
            </span>
            <p
              style={{
                color: theme === "dark" ? darkTheme.color : lightTheme.color,
              }}
            >
              {_id}
            </p>
          </div>
          <div className="settings-item">
            <span
              style={{
                color: theme === "dark" ? darkTheme.color : lightTheme.color,
              }}
            >
              Log out
            </span>
            <button className="logout-btn" onClick={handleLogout}>
              <MdOutlineLogout />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
