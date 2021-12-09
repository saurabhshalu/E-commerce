import axios from "axios";
import { USER_LOGIN } from "./userSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const initialState = {
  loading: false,
  userInfo: null,
  error: null,
};

export const register = createAsyncThunk(
  "user/register",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/users`,
        { name, email, password },
        config
      );
      thunkAPI.dispatch(USER_LOGIN(data));
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

const userRegisterSlice = createSlice({
  name: "userRegister",
  initialState,
  reducers: {
    USER_LOGOUT: (state) => {
      state.userInfo = null;
    },
  },
  extraReducers: {
    [register.pending]: (state) => {
      state.loading = true;
      state.userInfo = null;
      state.error = null;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default userRegisterSlice.reducer;
