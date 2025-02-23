import { createSlice } from "@reduxjs/toolkit";

const Notes = new createSlice({
    name: 'NotesData', 
    initialState: {
        isCreated: true, 
    }, 

    reducers: {
        setNoteData: (state, action) => {
            state.isCreated = action.payload; 
        }
    }
})

export const {setNoteData} = Notes.actions; 
export default Notes.reducer; 