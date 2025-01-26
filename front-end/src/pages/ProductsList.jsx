import React, { useEffect, useState } from "react";

const ProductsList = () => {
  const [productsList, setProductsList] = useState();

  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/products");
      const products = await response.json();
      setProductsList(products);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="products-wrapper">
      {productsList?.map((product) => {
        return (
          <div key={product?._id} className="product-wrapper">
            <p>Name: {product?.name}</p>
            <p>price: {product?.price}</p>
            <p>category: {product?.category}</p>
            <p>company: {product?.company}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsList;
