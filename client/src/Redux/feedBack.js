import { createSlice } from "@reduxjs/toolkit";

export const feedBack = createSlice({
  name: "feedback",
  initialState: {
    isOnClick: true,
    isOpen: false,
  },
  reducers: {
    setOnClick: (state, action) => {
      state.isOnClick = action.payload;
    },
    setFeedBackOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setFeedBackOpen, setOnClick } = feedBack.actions;
export default feedBack.reducer;
