const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");
const initialState = {
  loading: false,
  success: false,
  product: null,
  error: null,
};

export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ id, payload }, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().user.userInfo.token}`,
        },
      };
      const { data } = await axios.put(`/api/products/${id}`, payload, config);
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
const productUpdateSlice = createSlice({
  name: "productUpdate",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [updateProduct.pending]: (state) => {
      state.loading = true;
      state.success = false;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.product = action.payload;
    },
    [updateProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { reset } = productUpdateSlice.actions;
export default productUpdateSlice.reducer;
