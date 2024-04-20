import { createSlice } from "@reduxjs/toolkit";

export const createSpace = createSlice({
    name:'createSpace', 
    initialState: {
        inputValue: '', 
        cloneSpace: [], 
    }, 

    reducers: {
        handleInputValue: (state, action) => {
          state.inputValue = action.payload; 
        }, 
        handleClonedSpace: (state, action) => {
            state.cloneSpace = action.payload; 
        },
    }
})

export const {
    handleInputValue, 
    handleClonedSpace, 
} = createSpace.actions; 
export default createSpace.reducer; 