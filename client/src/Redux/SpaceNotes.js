import { createSlice } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist/es/constants";

export const SpaceNotes = createSlice({
  name: "spaceNotes",
  initialState: {
    spaceText: "",
    isRun: true, 
    noteId: '',
  },

  reducers: {
    handleSpaceText: (state, action) => {
      state.spaceText = action.payload;
    },

    setRun: (state, action) => {
      state.isRun = action.payload; 
    }, 

  },
  extraReducers: (builder) =>{
    builder.addCase(REHYDRATE, (state) =>{ 
      state.isRun = false
    })
  } 
});

export const { handleSpaceText, setRun} = SpaceNotes.actions;
export default SpaceNotes.reducer;
