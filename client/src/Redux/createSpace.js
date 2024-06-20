import { createSlice } from "@reduxjs/toolkit";

export const createSpace = createSlice({
  name: "createSpace",
  initialState: {
    inputValue: "",
    spaceText: "",
    spaceObjectId: "",
    isSpaceTextSubmit: true,
    ObjectId: "", 
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
    sendSpaceObjectId: (state, action) => {
      state.spaceObjectId = action.payload;
    },
    sendObjectId: (state, action) => {
      state.ObjectId = action.payload; 
    }, 
  },
});

export const {
  handleInputValue,
  handleSpaceText,
  shouldSpaceTextSubmit,
  sendSpaceObjectId,
  sendObjectId, 
} = createSpace.actions;
export default createSpace.reducer;
