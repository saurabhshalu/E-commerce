import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

export const getMyOrders = createAsyncThunk(
  "order/myorders",
  async (_, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().user.userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/orders/myorders`, config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);
const myOrderSlice = createSlice({
  name: "myOrders",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [getMyOrders.pending]: (state) => {
      state.loading = true;
    },
    [getMyOrders.fulfilled]: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    [getMyOrders.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { reset } = myOrderSlice.actions;

export default myOrderSlice.reducer;
