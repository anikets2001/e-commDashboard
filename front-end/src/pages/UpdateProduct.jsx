import React from "react";

const UpdateProduct = () => {
  return (
    <div className="formWrapper">
      <div className="fieldWrapper">
        <h1>Update Product</h1>
        <input
          className="inputField"
          name="name"
          type="text"
          placeholder="Enter product Name"
        />
        <span className="err-text">Enter Valid Name</span>
        <input
          className="inputField"
          name="price"
          type="number"
          placeholder="Enter product price"
        />
        <span className="err-text">Enter Valid Price</span>
        <input
          className="inputField"
          name="category"
          type="text"
          placeholder="Enter product category"
        />
        <span className="err-text">Enter Valid Category</span>
        <input
          className="inputField"
          name="company"
          type="text"
          placeholder="Enter product company"
        />

        <span className="err-text">Enter Valid Company</span>
        <button className="signUpBtn" >
          Update Product
        </button>
      </div>
    </div>
  );
};

export default UpdateProduct;
