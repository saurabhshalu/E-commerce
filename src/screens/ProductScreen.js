import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import products from "../products";

const ProductScreen = () => {
  const params = useParams();
  const navigate = useNavigate();
  const product = products.find((item) => item.id === +params.id);

  useEffect(() => {
    if (product === undefined) {
      navigate("/not-found");
    }
  }, [navigate, product]);

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
        src={`https://picsum.photos/400/400?random=${product.id}`}
        alt={product.name}
      />
      <p>{product.description}</p>
      <h3>Price: ${product.price}</h3>

      <button className="border-2 px-4 py-2 bg-green-500 rounded-md hover:bg-green-600">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductScreen;
