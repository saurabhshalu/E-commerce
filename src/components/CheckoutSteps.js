import React from "react";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="flex mb-8">
      {step1 ? (
        <Link className="px-4" to="/login">
          Sign In
        </Link>
      ) : (
        <div className="px-4 cursor-default text-gray-300">Sign In</div>
      )}
      {step2 ? (
        <Link className="px-4" to="/shipping">
          Shipping
        </Link>
      ) : (
        <div className="px-4 cursor-default text-gray-300">Shipping</div>
      )}
      {step3 ? (
        <Link className="px-4" to="/payment">
          Payment
        </Link>
      ) : (
        <div className="px-4 cursor-default text-gray-300">Payment</div>
      )}
      {step4 ? (
        <Link className="px-4" to="/placeorder">
          Place Order
        </Link>
      ) : (
        <div className="px-4 cursor-default text-gray-300">Place Order</div>
      )}
    </div>
  );
};

export default CheckoutSteps;
