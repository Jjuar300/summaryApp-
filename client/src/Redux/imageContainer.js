import { createSlice } from "@reduxjs/toolkit";

export const imageContainer = createSlice({
    name:'imageContainer', 
    initialState: {
        fileName: '', 
    }, 
    reducers:{
        setFileName:(state, action) => {
            state.fileName = action.payload; 
        }
    }
})

export const {
    setFileName, 
} = imageContainer.actions; 
export default imageContainer.reducer; 