import { MdOutlineLogout } from "react-icons/md";
import profile from "../images/profile.jpg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { userLoggedIn } from "../redux/features/common/commonSlice";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = localStorage.getItem("user");
  const { name, email, _id } = JSON.parse(auth) ?? { name: "Guest" };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(userLoggedIn(false));
    navigate("/signUp");
  };

  return (
    <div className="container">
      <div className="profile-container">
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
            <span>Dark mode</span>
            <div className="toggle-switch">
              <div className="toggle-thumb"></div>
            </div>
          </div>
          <div className="settings-item">
            <span>Name:</span>
            <p>{name}</p>
          </div>
          <div className="settings-item">
            <span>email:</span>
            <p>{email}</p>
          </div>
          <div className="settings-item">
            <span>user id:</span>
            <p>{_id}</p>
          </div>
          <div className="settings-item">
            <span>Log out</span>
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
