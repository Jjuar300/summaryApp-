import { createSlice } from "@reduxjs/toolkit";

export const createSpace = createSlice({
    name:'createSpace', 
    initialState: {
        inputValue: '', 
        spaceText: '', 
    }, 

    reducers: {
        handleInputValue: (state, action) => {
          state.inputValue = action.payload; 
        }, 
        handleSpaceText: (state, action) => {
            state.spaceText = action.payload; 
        }
    }
})

export const {
    handleInputValue,  
    handleSpaceText, 
} = createSpace.actions; 
export default createSpace.reducer; 