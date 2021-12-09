import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import ErrorMessage from "../components/Message/ErrorMessage";
import { getOrderDetails } from "../redux/order/orderDetailSlice";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

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
            <div className="mb-2">
              <span>Address: </span>
              <span className="font-light">
                {order.shippingAddress.address}, {order.shippingAddress.city},
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </span>
            </div>
            <hr />
          </div>
          <div className="p-6">
            <h1 className="text-2xl mb-2">PAYMENT METHOD</h1>
            <div className="mb-2">
              <span>Method: </span>
              <span className="font-light">{order.paymentMethod}</span>
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
              <div className="flex-1">₹{order.itemsPrice}</div>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderScreen;
