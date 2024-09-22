import { createSlice } from "@reduxjs/toolkit";

export const imageContainer = createSlice({
    name:'imageContainer', 
    initialState: {
        fileName: '', 
        isImageClick: false, 
        isFile: false, 
        fileLink: '', 
    }, 
    reducers:{
        setFileName:(state, action) => {
            state.fileName = action.payload; 
        }, 
        setImageClick: (state, action) =>{ 
            state.isImageClick = action.payload; 
        }, 
        setFile: (state, action) => {
            state.isFile = action.payload; 
        }, 
        setFileLink: (state, action) => {
            state.fileLink = action.payload; 
        }
    }
})

export const {
    setFileName, 
    setImageClick, 
    setFile, 
    setFileLink, 
} = imageContainer.actions; 
export default imageContainer.reducer; 