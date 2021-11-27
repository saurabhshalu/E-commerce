import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    CART_ADD_ITEM: (state, { payload }) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.product === payload.product
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex] = payload;
      } else {
        state.cartItems.push(payload);
      }
    },
    CART_REMOVE_ITEM: (state, { payload }) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.product === payload.product
      );
      if (itemIndex >= 0) {
        state.cartItems.splice(itemIndex, 1);
      }
    },
  },
});

const { CART_ADD_ITEM, CART_REMOVE_ITEM } = cartSlice.actions;

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (item, thunkAPI) => {
    const { data } = await axios.get(`/api/products/${item.id}`);
    const payload = {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty: item.qty,
    };
    thunkAPI.dispatch(CART_ADD_ITEM(payload));
    localStorage.setItem(
      "cartItems",
      JSON.stringify(thunkAPI.getState().cart.cartItems)
    );
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (item, thunkAPI) => {
    thunkAPI.dispatch(CART_REMOVE_ITEM(item));
    localStorage.setItem(
      "cartItems",
      JSON.stringify(thunkAPI.getState().cart.cartItems)
    );
  }
);
export default cartSlice.reducer;
