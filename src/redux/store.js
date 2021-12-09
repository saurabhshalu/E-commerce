import cartSlice from "./order/cartSlice";
import createOrderSlice from "./order/createOrderSlice";
import orderDetailSlice from "./order/orderDetailSlice";
import productListSlice from "./product/productListSlice";
import ProductSlice from "./product/productSlice";
import userDetailsSlice from "./user/userDetailsSlice";
import userRegisterSlice from "./user/userRegisterSlice";
import userSlice from "./user/userSlice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  devTools: true,
  reducer: {
    productList: productListSlice,
    productItem: ProductSlice,
    cart: cartSlice,
    user: userSlice,
    userRegister: userRegisterSlice,
    userDetails: userDetailsSlice,
    orderCreate: createOrderSlice,
    orderDetails: orderDetailSlice,
  },
});

export default store;
