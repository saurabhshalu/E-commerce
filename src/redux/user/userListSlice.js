const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");
const initialState = {
  loading: false,
  users: [],
  error: null,
};

export const getUserList = createAsyncThunk(
  "user/getUserList",
  async (_, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().user.userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/users`, config);
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
const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [getUserList.pending]: (state) => {
      state.loading = true;
    },
    [getUserList.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [getUserList.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { reset } = userListSlice.actions;
export default userListSlice.reducer;
