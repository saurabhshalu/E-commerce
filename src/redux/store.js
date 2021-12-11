import cartSlice from "./order/cartSlice";
import createOrderSlice from "./order/createOrderSlice";
import myOrderSlice from "./order/myOrderSlice";
import orderDeliverSlice from "./order/orderDeliverSlice";
import orderDetailSlice from "./order/orderDetailSlice";
import orderListSlice from "./order/orderListSlice";
import orderPaySlice from "./order/orderPaySlice";
import productCreateSlice from "./product/productCreateSlice";
import productDeleteSlice from "./product/productDeleteSlice";
import productListSlice from "./product/productListSlice";
import ProductSlice from "./product/productSlice";
import productUpdateSlice from "./product/productUpdateSlice";
import userDeleteSlice from "./user/userDeleteSlice";
import userDetailsSlice from "./user/userDetailsSlice";
import userListSlice from "./user/userListSlice";
import userRegisterSlice from "./user/userRegisterSlice";
import userSlice from "./user/userSlice";
import userUpdateSlice from "./user/userUpdateSlice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  devTools: true,
  reducer: {
    productList: productListSlice,
    productItem: ProductSlice,
    productDelete: productDeleteSlice,
    productCreate: productCreateSlice,
    productUpdate: productUpdateSlice,
    cart: cartSlice,
    user: userSlice,
    userList: userListSlice,
    userDelete: userDeleteSlice,
    userRegister: userRegisterSlice,
    userDetails: userDetailsSlice,
    userUpdate: userUpdateSlice,
    orderCreate: createOrderSlice,
    orderDetails: orderDetailSlice,
    orderPay: orderPaySlice,
    orderDeliver: orderDeliverSlice,
    orderList: orderListSlice,
    myOrder: myOrderSlice,
  },
});

export default store;
