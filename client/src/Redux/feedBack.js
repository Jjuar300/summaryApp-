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
    setOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setOpen, setOnClick } = feedBack.actions;
export default feedBack.reducer;
