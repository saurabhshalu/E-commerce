import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../redux/CartSlice";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingAddress, paymentMethod } = useSelector((state) => state.cart);

  useEffect(() => {
    if (Object.keys(shippingAddress).length === 0) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const [method, setMethod] = useState(paymentMethod || "PayPal");

  const savePaymentMethodHandler = () => {
    dispatch(savePaymentMethod(method));
    navigate("/placeorder");
  };
  return (
    <div className="flex p-6 flex-col items-center">
      <CheckoutSteps step1 step2 step3 />
      <h1 className="text-2xl">Payment Method</h1>
      <div className="border-2 m-6 p-6 w-96">
        <h3 className="text-xl mb-2">Select Method</h3>
        <input
          className="my-2"
          type="radio"
          id="PayPal"
          name="payment_method"
          value="PayPal"
          checked={method === "PayPal"}
          onChange={(e) => setMethod(e.target.value)}
        />
        <label htmlFor="PayPal">PayPal or Credit Card</label>
        <br />
        <input
          className="my-2"
          type="radio"
          id="Other"
          name="payment_method"
          value="Other"
          checked={method === "Other"}
          onChange={(e) => setMethod(e.target.value)}
          disabled
        />
        <label htmlFor="Other">Other</label>
        <br />

        <div>
          <button
            onClick={savePaymentMethodHandler}
            className={`px-8 py-2 rounded-md text-white font-bold m-2 bg-green-500 hover:bg-green-600`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;
