import { createSlice } from "@reduxjs/toolkit";

export const imageContainer = createSlice({
    name:'imageContainer', 
    initialState: {
        fileName: '', 
        isImageClick: false, 
    }, 
    reducers:{
        setFileName:(state, action) => {
            state.fileName = action.payload; 
        }, 
        setImageClick: (state, action) =>{ 
            state.isImageClick = action.payload; 
        }
    }
})

export const {
    setFileName, 
    setImageClick, 
} = imageContainer.actions; 
export default imageContainer.reducer; 