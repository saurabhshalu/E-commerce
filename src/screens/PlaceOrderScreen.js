import React from "react";
import { useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import ErrorMessage from "../components/Message/ErrorMessage";

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);
  const itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);
  const shippingPrice = (itemsPrice > 100 ? 0 : 100).toFixed(2);
  const taxPrice = (0.15 * itemsPrice).toFixed(2);
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  const placeOrderHandler = () => {};

  return (
    <>
      <div className="flex p-6 flex-col items-center">
        <CheckoutSteps step1 step2 step3 step4 />
      </div>
      <div className="flex">
        <div className="flex-1">
          <div className="p-6">
            <h1 className="text-2xl mb-2">SHIPPING</h1>
            <div className="mb-2">
              <span>Address: </span>
              <span className="font-light">
                {cart.shippingAddress.address}, {cart.shippingAddress.city},
                {cart.shippingAddress.postal}, {cart.shippingAddress.country}
              </span>
            </div>
            <hr />
          </div>
          <div className="p-6">
            <h1 className="text-2xl mb-2">PAYMENT METHOD</h1>
            <div className="mb-2">
              <span>Method: </span>
              <span className="font-light">{cart.paymentMethod}</span>
            </div>
            <hr />
          </div>
          <div className="p-6">
            <h1 className="text-2xl mb-2">ORDER ITEMS</h1>
            <div className="mx-4">
              {cart.cartItems.length === 0 ? (
                <ErrorMessage>Your cart is empty</ErrorMessage>
              ) : (
                cart.cartItems.map((item) => (
                  <div key={item.product} className="mb-4">
                    <div className="flex mb-2 items-center">
                      <img
                        className="h-8 w-8 rounded-md mr-8"
                        src={`https://picsum.photos/400/400?random=${item.product}`}
                        alt={item.name}
                      />
                      <div className="flex-1">{item.name}</div>
                      <div>
                        {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                      </div>
                    </div>
                    <hr />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="w-96">
          <div className="m-6 border-2 px-8 py-4">
            <h1 className="text-2xl mb-2">ORDER SUMMARY</h1>
            <hr />
            <div className="py-2 flex">
              <div className="flex-1">Items</div>
              <div className="flex-1">₹{itemsPrice}</div>
            </div>
            <hr />
            <div className="py-2 flex">
              <div className="flex-1">Shipping</div>
              <div className="flex-1">₹{shippingPrice}</div>
            </div>
            <hr />
            <div className="py-2 flex">
              <div className="flex-1">Tax</div>
              <div className="flex-1">₹{taxPrice}</div>
            </div>
            <hr />
            <div className="py-2 flex">
              <div className="flex-1">Total</div>
              <div className="flex-1">₹{totalPrice}</div>
            </div>
            <hr />
            <br />
            <button
              onClick={placeOrderHandler}
              className="bg-gray-900 text-white w-full py-4 font-bold hover:bg-gray-700"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
