const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");
const initialState = {
  loading: false,
  success: false,
  product: null,
  error: null,
};

export const createProduct = createAsyncThunk(
  "product/create",
  async (_, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().user.userInfo.token}`,
        },
      };
      const { data } = await axios.post(`/api/products`, {}, config);
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
const productCreateSlice = createSlice({
  name: "productCreate",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [createProduct.pending]: (state) => {
      state.loading = true;
      state.success = false;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.product = action.payload;
    },
    [createProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { reset } = productCreateSlice.actions;
export default productCreateSlice.reducer;
