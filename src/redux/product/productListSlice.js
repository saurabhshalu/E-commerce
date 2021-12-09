import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchProductList = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/api/products`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

const productListSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    // PRODUCT_LIST_REQUEST: (state) => {
    //   state.loading = true;
    // },
    // PRODUCT_LIST_SUCCESS: (state, payload) => {
    //   state.loading = false;
    //   state.products = payload;
    // },
    // PRODUCT_LIST_FAIL: (state, payload) => {
    //   state.loading = false;
    //   state.error = payload;
    // },
  },
  extraReducers: {
    [fetchProductList.pending]: (state) => {
      state.loading = true;
      state.products = [];
      state.error = null;
    },
    [fetchProductList.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    [fetchProductList.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// export const {
//   //PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL

// } = productListSlice.actions;

export default productListSlice.reducer;
