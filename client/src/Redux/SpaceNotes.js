import { createSlice } from "@reduxjs/toolkit";

export const SpaceNotes = createSlice({
  name: "spaceNotes",
  initialState: {
    spaceText: "",
    isNoteId: "", 
  },

  reducers: {
    handleSpaceText: (state, action) => {
      state.spaceText = action.payload;
    },

    setNoteId: (state, action) => {
      state.isNoteId = action.payload; 
    }
  },
});

export const { handleSpaceText, setNoteId } = SpaceNotes.actions;
export default SpaceNotes.reducer;
