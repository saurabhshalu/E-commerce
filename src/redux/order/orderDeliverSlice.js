import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  loading: false,
  success: false,
  error: null,
};

export const deliverOrder = createAsyncThunk(
  "order/deliver",
  async (id, thunkAPI) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.userInfo.token}`,
        },
      };
      const { data } = await axios.put(`/api/orders/${id}/deliver`, {}, config);
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

const orderDeliverSlice = createSlice({
  name: "orderPay",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [deliverOrder.pending]: (state) => {
      state.loading = true;
    },
    [deliverOrder.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [deliverOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { reset } = orderDeliverSlice.actions;
export default orderDeliverSlice.reducer;
