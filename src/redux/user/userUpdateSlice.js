const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");
const initialState = {
  loading: false,
  user: {},
  error: null,
};

export const updateUser = createAsyncThunk(
  "user/update",
  async ({ id, payload }, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().user.userInfo.token}`,
        },
      };
      const { data } = await axios.put(`/api/users/${id}`, payload, config);
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
const userUpdateSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [updateUser.pending]: (state) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { reset } = userUpdateSlice.actions;
export default userUpdateSlice.reducer;
