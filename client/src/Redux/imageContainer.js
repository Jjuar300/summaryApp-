import { createSlice } from "@reduxjs/toolkit";

export const imageContainer = createSlice({
    name:'imageContainer', 
    initialState: {
        fileName: '', 
        isImageClick: false, 
        isFile: false, 
        isUser: true, 
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
        isUserCreated: (state, action) => {
            state.isUser = action.payload; 
        }
    }
})

export const {
    setFileName, 
    setImageClick, 
    setFile,  
    isUserCreated, 
} = imageContainer.actions; 
export default imageContainer.reducer; 