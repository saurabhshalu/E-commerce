import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./redux/store";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import Layout from "./screens/Layout";
import LoginScreen from "./screens/LoginScreen";
import OrderListScreen from "./screens/OrderListScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductScreen from "./screens/ProductScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import UserEditScreen from "./screens/UserEditScreen";
import UserListScreen from "./screens/UserListScreen";
import UserProfile from "./screens/UserProfile";

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomeScreen />} />

              <Route path="login" element={<LoginScreen />} />
              <Route path="register" element={<RegisterScreen />} />
              <Route path="profile" element={<UserProfile />} />

              <Route path="shipping" element={<ShippingScreen />} />
              <Route path="payment" element={<PaymentScreen />} />
              <Route path="placeorder" element={<PlaceOrderScreen />} />

              <Route path="order/:id" element={<OrderScreen />} />

              <Route path="product/:id" element={<ProductScreen />} />
              <Route path="cart" element={<CartScreen />} />
              <Route path="cart/:id" element={<CartScreen />} />
              <Route path="admin/userList" element={<UserListScreen />} />
              <Route path="admin/productList" element={<ProductListScreen />} />
              <Route path="admin/orderList" element={<OrderListScreen />} />
              <Route
                path="admin/product/:id/edit"
                element={<ProductEditScreen />}
              />
              <Route path="admin/user/:id/edit" element={<UserEditScreen />} />

              <Route path="*" element={<div>404 NOT FOUND!</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
