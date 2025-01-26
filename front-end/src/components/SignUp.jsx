import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // useEffect(() => {
  //   const auth = localStorage.getItem("user");
  //   if (auth) {
  //     navigate("/");
  //     return null;
  //   }
  // }, []);

  useEffect(() => {
    const auth = localStorage.getItem("user");

    if (auth) {
      navigate("/");
      return <h1>You are already signed In</h1>;
    }
  },[]);

  const handleInput = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      localStorage.setItem("user", JSON.stringify(result));
      if (result) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
    }
  };

  return (
    <div className="formWrapper">
      <div className="fieldWrapper">
        <h1>Register</h1>
        <input
          className="inputField"
          name="name"
          type="text"
          placeholder="Enter Name"
          onChange={(e) => handleInput(e)}
        />
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
        <button className="signUpBtn" onClick={handleSignUp}>
          Sign up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
