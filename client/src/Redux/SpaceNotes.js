import { createSlice } from "@reduxjs/toolkit";

export const SpaceNotes = createSlice({
  name: "spaceNotes",
  initialState: {
    spaceText: "",
  },

  reducers: {
    handleSpaceText: (state, action) => {
      state.spaceText = action.payload;
    },
  },
});

export const { handleSpaceText } = SpaceNotes.actions;
export default SpaceNotes.reducer;
