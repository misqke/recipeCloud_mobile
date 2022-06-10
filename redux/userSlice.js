import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { _id: null, username: null, likes: [], token: null },
  reducers: {
    setUser: (state, { payload }) => {
      state._id = payload._id;
      state.username = payload.username;
      state.likes = payload.likes;
      state.token = payload.token;
    },
    logoutUser: (state) => {
      state._id = null;
      state.username = null;
      state.likes = [];
      state.token = null;
    },
    updateLikes: (state, { payload }) => {
      state.likes = payload;
    },
  },
});

export const { setUser, logoutUser, updateLikes } = userSlice.actions;
export default userSlice.reducer;
