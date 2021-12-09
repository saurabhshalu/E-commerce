import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import Loader from "../components/Loader";
import ErrorMessage from "../components/Message/ErrorMessage";
import { fetchProductById } from "../redux/product/productSlice";

const ProductScreen = () => {
  const params = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductById(params.id));
  }, [dispatch, params.id]);

  const { product, loading, error } = useSelector((state) => state.productItem);

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=1`);
  };

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorMessage text={error} />;
  }
  return (
    <div>
      <div className="flex justify-between p-4">
        <h1>Product: {product.name}</h1>
        <button
          className="border-2 px-4 py-1 rounded mx-2"
          onClick={() => {
            navigate("/");
          }}
        >
          Go Back
        </button>
      </div>
      <img
        src={`https://picsum.photos/400/400?random=${product._id}`}
        alt={product.name}
      />
      <p>{product.description}</p>
      <h3>Price: ₹{product.price}</h3>

      <button
        onClick={addToCartHandler}
        disabled={product.countInStock === 0}
        className={`border-2 px-4 py-2 rounded-md ${
          product.countInStock === 0
            ? "bg-gray-500 cursor-default"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductScreen;
