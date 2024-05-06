import { createSlice } from "@reduxjs/toolkit";

export const createSpace = createSlice({
    name:'createSpace', 
    initialState: {
        inputValue: '', 
    }, 

    reducers: {
        handleInputValue: (state, action) => {
          state.inputValue = action.payload; 
        }, 
    }
})

export const {
    handleInputValue,  
} = createSpace.actions; 
export default createSpace.reducer; 