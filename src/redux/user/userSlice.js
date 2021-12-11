import axios from "axios";
import { reset as resetMyOrders } from "../order/myOrderSlice";
import { reset as resetUser } from "./userDetailsSlice";
import { reset as resetUserList } from "./userListSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  loading: false,
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  error: null,
};

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/users/login`,
        { email, password },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      localStorage.removeItem("userInfo");
      return thunkAPI.rejectWithValue(
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const logout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  localStorage.removeItem("userInfo");
  thunkAPI.dispatch(resetUser());
  thunkAPI.dispatch(resetMyOrders());
  thunkAPI.dispatch(USER_LOGOUT());
  thunkAPI.dispatch(resetUserList());
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    USER_LOGIN: (state, { payload }) => {
      state.userInfo = payload.userInfo;
      state.error = null;
    },
    USER_LOGOUT: (state) => {
      state.userInfo = null;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
      state.userInfo = null;
      state.error = null;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { USER_LOGOUT, USER_LOGIN } = userSlice.actions;

export default userSlice.reducer;
