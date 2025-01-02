import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: {},
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export default profileSlice.reducer;
export const { setProfile } = profileSlice.actions;
