import { createSlice } from "@reduxjs/toolkit";

export const imageContainer = createSlice({
    name:'imageContainer', 
    initialState: {
        fileName: '', 
        isImageClick: false, 
        isFile: false, 
    }, 
    reducers:{
        setFileName:(state, action) => {
            state.fileName = action.payload; 
        }, 
        setImageClick: (state) => { 
            state.isImageClick = !state.isImageClick; 
        }, 
        setFile: (state, action) => {
            state.isFile = action.payload; 
        }, 
    }
})

export const {
    setFileName, 
    setImageClick, 
    setFile,  
} = imageContainer.actions; 
export default imageContainer.reducer; 