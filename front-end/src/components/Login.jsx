import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // useEffect(() => {
  //   const auth = localStorage.getItem("user");

  //   if (auth) {
  //     navigate("/");
  //     return <h1>You are already signed In</h1>;
  //   } else {
  //     navigate("/login");
  //   }
  // }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    result = await result.json();
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));

      navigate("/");
    } else {
      alert("Please enter correct details");
    }
  };

  return (
    <div className="formWrapper">
      <div className="fieldWrapper">
        <h1>Login</h1>
        <input
          className="inputField"
          name="email"
          type="email"
          placeholder="Enter Email"
          onChange={(e) => handleInput(e)}
        />
        <input
          className="inputField"
          name="password"
          type="password"
          placeholder="Enter Password"
          onChange={(e) => handleInput(e)}
        />
        <button className="signUpBtn" onClick={handleLogin}>
          Log In
        </button>
      </div>
    </div>
  );
};

export default Login;
