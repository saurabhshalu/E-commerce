// import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import ErrorMessage from "../components/Message/ErrorMessage";
import Product from "../components/Product";
import { fetchProductList } from "../redux/product/productListSlice";

const HomeScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductList());
  }, [dispatch]);

  const { products, loading, error } = useSelector(
    (state) => state.productList
  );

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorMessage text={error} />;
  }
  if (products.length === 0) {
    return (
      <div>There is no products to display, please come back in some time.</div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap justify-center justify-items-start">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
