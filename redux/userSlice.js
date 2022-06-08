import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { _id: null, username: null, likes: [] },
  reducers: {
    setUser: (state, { payload }) => {
      state._id = payload._id;
      state.username = payload.username;
      state.likes = payload.likes;
    },
    logoutUser: (state) => {
      state._id = null;
      state.username = null;
      state.likes = [];
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
