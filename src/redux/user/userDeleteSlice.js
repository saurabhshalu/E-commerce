const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");
const initialState = {
  loading: false,
  success: false,
  error: null,
};

export const deleteUser = createAsyncThunk(
  "user/delete",
  async (id, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().user.userInfo.token}`,
        },
      };
      const { data } = await axios.delete(`/api/users/${id}`, config);
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
const userDeleteSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [deleteUser.pending]: (state) => {
      state.loading = true;
      state.success = false;
    },
    [deleteUser.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { reset } = userDeleteSlice.actions;
export default userDeleteSlice.reducer;
