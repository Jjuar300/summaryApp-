import { createSlice } from "@reduxjs/toolkit";

export const createSpace = createSlice({
  name: "createSpace",
  initialState: {
    inputValue: "",
    spaceText: "",
    isSpaceTextSubmit: true,
  },

  reducers: {
    handleInputValue: (state, action) => {
      state.inputValue = action.payload;
    },
    handleSpaceText: (state, action) => {
      state.spaceText = action.payload;
    },
    shouldSpaceTextSubmit: (state, action) => {
      state.isSpaceTextSubmit = action.payload;
    },
  },
});

export const { handleInputValue, handleSpaceText, shouldSpaceTextSubmit } = createSpace.actions;
export default createSpace.reducer;
