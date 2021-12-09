import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: true,
  error: null,
  orderItems: [],
  shippingAddress: {},
};

export const getOrderDetails = createAsyncThunk(
  "order/getDetails",
  async (id, thunkAPI) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/orders/${id}`, config);
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

const orderDetailSlice = createSlice({
  name: "orderDetails",
  initialState,
  extraReducers: {
    [getOrderDetails.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getOrderDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    [getOrderDetails.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default orderDetailSlice.reducer;
