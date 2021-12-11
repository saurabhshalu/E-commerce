import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  loading: false,
  success: false,
  error: null,
};

export const payOrder = createAsyncThunk(
  "order/payOrder",
  async ({ id, paymentResult }, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().user.userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/orders/${id}/pay`,
        paymentResult,
        config
      );
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

const orderPaySlice = createSlice({
  name: "orderPay",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [payOrder.pending]: (state) => {
      state.loading = true;
    },
    [payOrder.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [payOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { reset } = orderPaySlice.actions;
export default orderPaySlice.reducer;
