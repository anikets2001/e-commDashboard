import React, { useState } from "react";

const AddProduct = () => {
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    category: "",
    company: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddProduct = async () => {
    // form validation
    if (
      !formData.name ||
      !formData.price ||
      !formData.category ||
      !formData.company
    ) {
      setError(true);
      return;
    }

    const auth = localStorage.getItem("user");
    const { _id } = JSON.parse(auth);
    try {
      const response = await fetch("http://localhost:5000/addProduct", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userId: _id,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="formWrapper">
      <div className="fieldWrapper">
        <h1>Add Product</h1>
        <input
          className="inputField"
          name="name"
          type="text"
          placeholder="Enter product Name"
          onChange={(e) => handleInput(e)}
        />
        {error && !formData.name && (
          <span className="err-text">Enter Valid Name</span>
        )}
        <input
          className="inputField"
          name="price"
          type="number"
          placeholder="Enter product price"
          onChange={(e) => handleInput(e)}
        />
        {error && !formData.price && (
          <span className="err-text">Enter Valid Price</span>
        )}
        <input
          className="inputField"
          name="category"
          type="text"
          placeholder="Enter product category"
          onChange={(e) => handleInput(e)}
        />
        {error && !formData.category && (
          <span className="err-text">Enter Valid Category</span>
        )}
        <input
          className="inputField"
          name="company"
          type="text"
          placeholder="Enter product company"
          onChange={(e) => handleInput(e)}
        />
        {error && !formData.company && (
          <span className="err-text">Enter Valid Company</span>
        )}
        <button className="signUpBtn" onClick={handleAddProduct}>
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
