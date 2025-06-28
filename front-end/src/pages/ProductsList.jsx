import { useEffect, useState } from "react";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useDebounce from "./useDebounce"; 

const ProductsList = () => {
  const navigate = useNavigate();
  const [productsList, setProductsList] = useState([]);
  const [deleteProduct, setDeleteProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useDebounce(searchTerm, 500); 

  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/products", {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      const products = await response.json();
      setProductsList(products);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, [deleteProduct]);

  useEffect(() => {
    const handleSearch = async () => {
      if (debouncedSearch) {
        let response = await fetch(`http://localhost:5000/search/${debouncedSearch}`, {
          headers: {
            authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        });
        let result = await response.json();
        setProductsList(result);
      } else {
        getProducts();
      }
    };

    handleSearch();
  }, [debouncedSearch]); 

  const handleDelete = async (id) => {
    let response = await fetch(`http://localhost:5000/deleteProduct/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    response = await response.json();
    setDeleteProduct(id);

    if (response) {
      alert("Product deleted successfully");
    }
  };

  return (
    <div className="products-wrapper">
      <div className="search-wrapper">
        <input
          type="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {productsList?.length > 0 ? (
        <table className="products-table">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Company</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {productsList?.map((product, index) => (
              <tr key={product?._id}>
                <td>{index + 1}</td>
                <td>{product?.name}</td>
                <td>{product?.price}</td>
                <td>{product?.category}</td>
                <td>{product?.company}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(product?._id)}
                  >
                    <MdDeleteForever className="icon-btn" />
                  </button>
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/update/${product?._id}`)}
                  >
                    <MdModeEdit className="icon-btn" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-data-wrapper">
          <div className="btn-wrapper">
            <span>No Products Found!</span>
            <button className="addBtn" onClick={() => navigate("/addProduct")}>
              Add Product
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsList;
