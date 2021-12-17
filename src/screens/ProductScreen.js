import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import ErrorMessage from "../components/Message/ErrorMessage";
import InformationMessage from "../components/Message/InformationMessage";
import SuccessMessage from "../components/Message/SuccessMessage";
import {
  createProductReview,
  reset as resetCreateReview,
} from "../redux/product/productReviewCreateSlice";
import { fetchProductById } from "../redux/product/productSlice";

const ProductScreen = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const { product, loading, error } = useSelector((state) => state.productItem);

  const { userInfo } = useSelector((state) => state.user);

  const {
    success: reviewSuccess,
    loading: reviewLoading,
    error: reviewError,
  } = useSelector((state) => state.productReviewCreate);

  useEffect(() => {
    dispatch(resetCreateReview());
    if (reviewSuccess) {
      setRating(5);
      setComment("");
    }
    dispatch(fetchProductById(params.id));
  }, [dispatch, params.id, reviewSuccess]);

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=1`);
  };

  const submitReviewHandler = () => {
    const id = params.id;
    const payload = { rating, comment };

    dispatch(createProductReview({ id, payload }));
  };

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorMessage text={error} />;
  }
  return (
    <div className="p-4">
      <div>
        <div className="flex justify-between p-4">
          <h1 className="text-2xl font-bold">Product: {product.name}</h1>
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
      <div className="mt-4">
        <h1 className="text-xl font-bold">Write a review</h1>
        {userInfo ? (
          <div className="border-2 block relative p-2">
            {reviewError && <ErrorMessage>{reviewError}</ErrorMessage>}
            <span>Rating: </span>
            <select
              onChange={(e) => {
                setRating(e.target.value);
              }}
              value={rating}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            <br />
            <br />
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border-2 rounded-md p-2 w-full"
              type="text"
              placeholder="Write a comment"
            />
            <div>
              <button
                onClick={submitReviewHandler}
                disabled={reviewLoading}
                className={`px-8 py-2 rounded-md text-white font-bold mt-2 ${
                  reviewLoading
                    ? "bg-gray-700"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {reviewLoading ? "Please wait..." : "Submit"}
              </button>
            </div>
          </div>
        ) : (
          <InformationMessage>
            Please{" "}
            <Link className="font-bold" to="/login">
              &nbsp;Login&nbsp;
            </Link>{" "}
            to add the review
          </InformationMessage>
        )}
      </div>
      <div className="mt-4">
        <h1 className="text-xl font-bold">Reviews</h1>
        {product.reviews.length === 0 && (
          <InformationMessage>No reviews yet</InformationMessage>
        )}
        {product.reviews.map((review) => (
          <div key={review._id}>
            <strong>{review.name}</strong>
            <span>Rating: {review.rating}</span>
            <p>{review.createdAt.substring(0, 10)}</p>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductScreen;
