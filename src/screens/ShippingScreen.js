import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../redux/order/cartSlice";

const ShippingScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const saveShippingHandler = () => {
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };
  return (
    <div className="flex p-6 flex-col items-center">
      <CheckoutSteps step1 step2 />
      <h1 className="text-2xl">Shipping</h1>
      <div className="border-2 m-6 p-6">
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border-2 rounded-md p-2 m-2"
          type="text"
          placeholder="Address"
        />
        <br />
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border-2 rounded-md p-2 m-2"
          type="text"
          placeholder="City"
        />
        <br />
        <input
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          className="border-2 rounded-md p-2 m-2"
          type="text"
          placeholder="Postal Code"
        />
        <br />
        <input
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="border-2 rounded-md p-2 m-2"
          type="text"
          placeholder="Country"
        />

        <div>
          <button
            onClick={saveShippingHandler}
            className={`px-8 py-2 rounded-md text-white font-bold m-2 bg-green-500 hover:bg-green-600`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShippingScreen;
