import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  success: false,
  order: null,
  error: null,
};

export const createOrder = createAsyncThunk(
  "order/create",
  async (order, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().user.userInfo.token}`,
        },
      };
      const { data } = await axios.post(`/api/orders`, order, config);
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

const createOrderSlice = createSlice({
  name: "createOrder",
  initialState,
  extraReducers: {
    [createOrder.pending]: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
      state.order = null;
    },
    [createOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.order = action.payload;
    },
    [createOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default createOrderSlice.reducer;
