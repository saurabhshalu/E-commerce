import React from "react";

const Product = ({ product }) => {
  return (
    <a href={`/product/${product.id}`}>
      <div className="rounded-xl overflow-hidden m-5 relative border-2 border-gray-900">
        <div className="absolute bottom-0 bg-gray-300 w-full h-12 border-t-2 border-gray-900 flex items-center p-2 justify-between">
          <div>{product.name}</div>
          <div className="font-bold text-black">₹{product.price}</div>
        </div>
        <img
          alt="picsum"
          src={`https://picsum.photos/400/400?random=${product.id}`}
        />
      </div>
    </a>
  );
};

export default Product;
