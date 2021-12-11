import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import InformationMessage from "../components/Message/InformationMessage";
import { addToCart, removeFromCart } from "../redux/order/cartSlice";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const qty = +searchParams.get("qty") || 1;

  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    if (id) {
      dispatch(addToCart({ id, qty }));
    }
  }, [dispatch, id, qty]);

  const checkoutHandler = () => {
    navigate(`/login?redirect=shipping`);
  };

  const removeFromCartHandler = (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <InformationMessage>
          No items in cart&nbsp;
          <b>
            <Link to="/">Go back</Link>
          </b>
        </InformationMessage>
      ) : (
        <div>
          <div className="flex">
            {cartItems.map((item) => (
              <div
                className="shadow-md rounded-md overflow-hidden m-6"
                style={{ width: 300 }}
              >
                <img
                  className="w-full h-40"
                  src={`https://picsum.photos/400/400?random=${item.product}`}
                  alt={item.name}
                />

                <div className="p-4">
                  <h5 className="text-xl font-semibold mb-2 hover:text-gray-800">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </h5>
                  <div className="flex justify-between">
                    <div>Price: ₹{item.price}</div>
                    <div>
                      Quantity:&nbsp;
                      <select
                        value={item.qty}
                        name="qty"
                        id="qty"
                        onChange={(e) => {
                          dispatch(
                            addToCart({
                              id: item.product,
                              qty: +e.target.value,
                            })
                          );
                        }}
                      >
                        {[...Array(item.countInStock).keys()].map((item) => (
                          <option value={item + 1}>{item + 1}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      removeFromCartHandler(item);
                    }}
                    className="border-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="border-2 p-4 mx-6">
            <h2 className="text-2xl">
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              Items
            </h2>
            <p className="text-xl font-bold">
              ₹
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </p>
            <button
              onClick={checkoutHandler}
              className="bg-gray-900 text-white px-10 py-4 my-2 rounded-lg font-bold text-xl hover:bg-gray-800"
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
