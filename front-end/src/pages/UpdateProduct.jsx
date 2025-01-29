import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);

  const getProduct = async () => {
    try {
      const response = await fetch(`http://localhost:5000/product/${id}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      const item = await response.json();
      setProduct(item);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/updateProduct/${id}`,
        {
          method: "Put",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
          body: JSON.stringify(product),
        }
      );
      const updatedProduct = await response.json();
      if (updatedProduct) {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="formWrapper">
      <div className="fieldWrapper">
        <h1>Update Product</h1>
        <input
          className="inputField"
          name="name"
          type="text"
          value={product?.name ?? "--"}
          placeholder="Enter product Name"
          onChange={(e) => handleInput(e)}
        />
        {!product?.name && <span className="err-text">Enter Valid Name</span>}
        <input
          className="inputField"
          name="price"
          type="number"
          value={product?.price ?? "--"}
          placeholder="Enter product price"
          onChange={(e) => handleInput(e)}
        />
        {!product?.price && <span className="err-text">Enter Valid Price</span>}
        <input
          className="inputField"
          name="category"
          type="text"
          value={product?.category ?? "--"}
          placeholder="Enter product category"
          onChange={(e) => handleInput(e)}
        />
        {!product?.category && (
          <span className="err-text">Enter Valid Category</span>
        )}
        <input
          className="inputField"
          name="company"
          type="text"
          value={product?.company ?? "--"}
          placeholder="Enter product company"
          onChange={(e) => handleInput(e)}
        />
        {!product?.company && (
          <span className="err-text">Enter Valid Company</span>
        )}
        <button className="signUpBtn" onClick={handleUpdate}>
          Update Product
        </button>
      </div>
    </div>
  );
};

export default UpdateProduct;
