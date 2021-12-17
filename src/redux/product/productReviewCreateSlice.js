const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");
const initialState = {
  loading: false,
  success: false,
  error: null,
};

export const createProductReview = createAsyncThunk(
  "product/review",
  async ({ id, payload }, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().user.userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/products/${id}/reviews`,
        payload,
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
const productReviewCreateSlice = createSlice({
  name: "productReview",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [createProductReview.pending]: (state) => {
      state.loading = true;
      state.success = false;
    },
    [createProductReview.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    [createProductReview.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { reset } = productReviewCreateSlice.actions;
export default productReviewCreateSlice.reducer;
