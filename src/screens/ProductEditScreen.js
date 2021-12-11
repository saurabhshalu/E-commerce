import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import ErrorMessage from "../components/Message/ErrorMessage";
import { fetchProductById } from "../redux/product/productSlice";
import {
  reset as resetUpdate,
  updateProduct,
} from "../redux/product/productUpdateSlice";

const ProductEditScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { product, loading, error } = useSelector((state) => state.productItem);

  const {
    error: updateError,
    loading: updateLoading,
    success: updateSuccess,
  } = useSelector((state) => state.productUpdate);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (updateSuccess) {
      dispatch(resetUpdate());
      navigate("/admin/productList");
    } else {
      if (!product.name || product._id !== id) {
        dispatch(fetchProductById(id));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, id, product, navigate, updateSuccess]);

  const updateProductHandler = () => {
    const payload = {
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    };
    dispatch(updateProduct({ id, payload }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        "Content-Type": "multipart/form-data",
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <div className="flex p-6 flex-col items-center">
      <h1 className="text-2xl">Update Product</h1>
      {updateLoading && <Loader />}
      {updateError && <ErrorMessage>{updateError}</ErrorMessage>}
      {loading ? (
        <Loader />
      ) : (
        <div className="border-2 m-6 p-6 flex flex-col">
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 rounded-md p-2 m-2"
            type="text"
            placeholder="Name"
          />
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border-2 rounded-md p-2 m-2"
            type="number"
            placeholder="Price"
          />
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border-2 rounded-md p-2 m-2"
            type="text"
            placeholder="Enter image url"
          />
          {uploading && <Loader />}
          <input
            className="px-2 pb-2"
            type="file"
            onChange={(e) => {
              handleFileChange(e);
            }}
          />
          <input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="border-2 rounded-md p-2 m-2"
            type="text"
            placeholder="Brand"
          />
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border-2 rounded-md p-2 m-2"
            type="text"
            placeholder="Category"
          />
          <input
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
            className="border-2 rounded-md p-2 m-2"
            type="number"
            placeholder="Count in Stock"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 rounded-md p-2 m-2"
            type="text"
            placeholder="Description"
          />
          <div>
            <button
              onClick={updateProductHandler}
              disabled={updateLoading}
              className={`px-8 py-2 rounded-md text-white font-bold m-2 ${
                updateLoading
                  ? "bg-gray-700"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {updateLoading ? "Please wait..." : "Update"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductEditScreen;
