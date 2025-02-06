import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    category: "",
    company: "",
  });
  const { name, price, category, company } = formData;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddProduct = async () => {
    // form validation (required fields)
    if (!name || !price || !category || !company) {
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
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
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
      if (result) {
        navigate("/");
      }
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
        {error && !name && <span className="err-text">Enter Valid Name</span>}
        <input
          className="inputField"
          name="price"
          type="number"
          placeholder="Enter product price"
          onChange={(e) => handleInput(e)}
        />
        {error && !price && <span className="err-text">Enter Valid Price</span>}
        <input
          className="inputField"
          name="category"
          type="text"
          placeholder="Enter product category"
          onChange={(e) => handleInput(e)}
        />
        {error && !category && (
          <span className="err-text">Enter Valid Category</span>
        )}
        <input
          className="inputField"
          name="company"
          type="text"
          placeholder="Enter product company"
          onChange={(e) => handleInput(e)}
        />
        {error && !company && (
          <span className="err-text">Enter Valid Company</span>
        )}
        <button
          className="signUpBtn"
          onClick={handleAddProduct}
          disabled={!name || !price || !category || !company}
          style={{
            backgroundColor:
              !name || !price || !category || !company ? "gray" : "",
          }}
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
