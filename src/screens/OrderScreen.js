import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import ErrorMessage from "../components/Message/ErrorMessage";
import SuccessMessage from "../components/Message/SuccessMessage";
import { getOrderDetails } from "../redux/order/orderDetailSlice";
import { PayPalButton } from "react-paypal-button-v2";
import { payOrder, reset as resetPay } from "../redux/order/orderPaySlice";
import {
  deliverOrder,
  reset as resetDeliver,
} from "../redux/order/orderDeliverSlice";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [sdkReady, setSdkReady] = useState(false);
  const { loading: loadingPay, success: successPay } = useSelector(
    (state) => state.orderPay
  );

  const { userInfo } = useSelector((state) => state.user);

  const { loading: loadingDeliver, success: successDeliver } = useSelector(
    (state) => state.orderDeliver
  );

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || order._id !== id || successPay || successDeliver) {
      dispatch(resetPay());
      dispatch(resetDeliver());

      dispatch(getOrderDetails(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, id, order, successPay, successDeliver]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder({ id, paymentResult }));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <>
      <h1 className="text-2xl m-4 ">Order {order._id}</h1>
      <div className="flex">
        <div className="flex-1">
          <div className="p-6">
            <h1 className="text-2xl mb-2">SHIPPING</h1>
            <p>
              <strong>Name: </strong> {order.user.name}
            </p>
            <p>
              <strong>Email: </strong>{" "}
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </p>
            <div className="mb-2">
              <span>Address: </span>
              <span className="font-light">
                {order.shippingAddress.address}, {order.shippingAddress.city},
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </span>
            </div>
            <div>
              {order.isDelivered ? (
                <SuccessMessage>
                  Delivered On: {order.deliveredAt}
                </SuccessMessage>
              ) : (
                <ErrorMessage>Not Delivered</ErrorMessage>
              )}
            </div>
            <hr />
          </div>
          <div className="p-6">
            <h1 className="text-2xl mb-2">PAYMENT METHOD</h1>
            <div className="mb-2">
              <span>Method: </span>
              <span className="font-light">{order.paymentMethod}</span>
            </div>
            <div>
              {order.isPaid ? (
                <SuccessMessage>Paid On: {order.paidAt}</SuccessMessage>
              ) : (
                <ErrorMessage>Not Paid</ErrorMessage>
              )}
            </div>
            <hr />
          </div>
          <div className="p-6">
            <h1 className="text-2xl mb-2">ORDER ITEMS</h1>
            <div className="mx-4">
              {order.orderItems.length === 0 ? (
                <ErrorMessage>Order is empty</ErrorMessage>
              ) : (
                order.orderItems.map((item) => (
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
              <div className="flex-1">
                ₹
                {order.orderItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </div>
            </div>
            <hr />
            <div className="py-2 flex">
              <div className="flex-1">Shipping</div>
              <div className="flex-1">₹{order.shippingPrice}</div>
            </div>
            <hr />
            <div className="py-2 flex">
              <div className="flex-1">Tax</div>
              <div className="flex-1">₹{order.taxPrice}</div>
            </div>
            <hr />
            <div className="py-2 flex">
              <div className="flex-1">Total</div>
              <div className="flex-1">₹{order.totalPrice}</div>
            </div>
            {!order.isPaid && (
              <div className="py-2 flex justify-center">
                {loadingPay && <Loader />}
                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successPaymentHandler}
                  />
                )}
              </div>
            )}
            {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
              <div className="py-2 flex justify-center flex-col">
                {loadingDeliver && <Loader />}
                <button
                  disabled={loadingDeliver}
                  className="bg-gray-900 hover:bg-gray-700 text-white w-full py-4 rounded-md font-bold"
                  onClick={deliverHandler}
                >
                  Mark as Delivered
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderScreen;
