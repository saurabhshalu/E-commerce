import axios from "axios";
import { USER_LOGIN } from "./userSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  loading: false,
  user: null,
  error: null,
  updatedProfile: {
    success: false,
    error: null,
    loading: false,
  },
};

export const getUserDetails = createAsyncThunk(
  "user/profile",
  async (id, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().user.userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/users/${id}`, config);
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

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (user, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().user.userInfo.token}`,
        },
      };
      const { data } = await axios.put(`/api/users/profile`, user, config);
      localStorage.setItem("userInfo", JSON.stringify(data));
      thunkAPI.dispatch(USER_LOGIN({ userInfo: data }));
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

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    reset: () => initialState,
    USER_UPDATE_PROFILE_RESET: (state) => {
      state.updatedProfile.success = false;
      state.updatedProfile.error = null;
      state.updatedProfile.loading = false;
    },
  },
  extraReducers: {
    [getUserDetails.pending]: (state) => {
      state.loading = true;
      state.updatedProfile.success = false;
    },
    [getUserDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [getUserDetails.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateProfile.pending]: (state) => {
      state.updatedProfile.loading = true;
      state.updatedProfile.success = false;
      state.updatedProfile.error = null;
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.updatedProfile.loading = false;
      state.updatedProfile.success = true;
      state.user = action.payload;
    },
    [updateProfile.rejected]: (state, action) => {
      state.updatedProfile.loading = false;
      state.updatedProfile.error = action.payload;
    },
  },
});

export const { reset, USER_UPDATE_PROFILE_RESET } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
