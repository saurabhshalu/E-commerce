import cartSlice from "./order/cartSlice";
import createOrderSlice from "./order/createOrderSlice";
import myOrderSlice from "./order/myOrderSlice";
import orderDetailSlice from "./order/orderDetailSlice";
import orderPaySlice from "./order/orderPaySlice";
import productListSlice from "./product/productListSlice";
import ProductSlice from "./product/productSlice";
import userDeleteSlice from "./user/userDeleteSlice";
import userDetailsSlice from "./user/userDetailsSlice";
import userListSlice from "./user/userListSlice";
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
    userList: userListSlice,
    userDelete: userDeleteSlice,
    userRegister: userRegisterSlice,
    userDetails: userDetailsSlice,
    orderCreate: createOrderSlice,
    orderDetails: orderDetailSlice,
    orderPay: orderPaySlice,
    myOrder: myOrderSlice,
  },
});

export default store;
