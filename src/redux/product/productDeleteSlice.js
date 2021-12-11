const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");
const initialState = {
  loading: false,
  success: false,
  error: null,
};

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().user.userInfo.token}`,
        },
      };
      const { data } = await axios.delete(`/api/products/${id}`, config);
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
const productDeleteSlice = createSlice({
  name: "productDelete",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [deleteProduct.pending]: (state) => {
      state.loading = true;
      state.success = false;
    },
    [deleteProduct.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [deleteProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { reset } = productDeleteSlice.actions;
export default productDeleteSlice.reducer;
