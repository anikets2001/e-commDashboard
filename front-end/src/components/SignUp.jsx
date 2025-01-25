import React, { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = () => {
    console.log("formData:", formData);
  };

  return (
    <div className="signUpWrapper">
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
