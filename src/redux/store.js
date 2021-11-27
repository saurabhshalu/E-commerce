import CartSlice from "./CartSlice";
import productListSlice from "./ProductListSlice";
import ProductSlice from "./ProductSlice";
import UserRegisterSlice from "./UserRegisterSlice";
import UserSlice from "./UserSlice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  devTools: true,
  reducer: {
    productList: productListSlice,
    productItem: ProductSlice,
    cart: CartSlice,
    user: UserSlice,
    userRegister: UserRegisterSlice,
  },
});

export default store;
