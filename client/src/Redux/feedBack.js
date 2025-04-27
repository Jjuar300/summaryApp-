import { createSlice } from "@reduxjs/toolkit";

export const feedBack = createSlice({
  name: "feedback",
  initialState: {
    isOnClick: true,
    isOpen: false,
    isNotify: false,
  },
  reducers: {
    setOnClick: (state, action) => {
      state.isOnClick = action.payload;
    },
    setFeedBackOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setNotify: (state, action) => {
      state.isNotify = action.payload;
    },
  },
});

export const { setFeedBackOpen, setOnClick, setNotify } = feedBack.actions;
export default feedBack.reducer;
