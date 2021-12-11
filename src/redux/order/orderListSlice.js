const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");
const initialState = {
  loading: false,
  orders: [],
  error: null,
};

export const getOrderList = createAsyncThunk(
  "order/getOrderList",
  async (_, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().user.userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/orders`, config);
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
const orderListSlice = createSlice({
  name: "orderList",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [getOrderList.pending]: (state) => {
      state.loading = true;
    },
    [getOrderList.fulfilled]: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    [getOrderList.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { reset } = orderListSlice.actions;
export default orderListSlice.reducer;
