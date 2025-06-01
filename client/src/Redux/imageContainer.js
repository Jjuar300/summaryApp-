import { createSlice } from "@reduxjs/toolkit";

export const imageContainer = createSlice({
    name:'imageContainer', 
    initialState: {
        fileName: '', 
        isImageClick: false, 
        isFile: false, 
        isUser: true, 
        profileImagePath: '', 
        isUserProfile: true, 
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
        }, 
        setProfileImage: (state, action) => {
            state.profileImagePath = action.payload; 
        }, 
        setUserCreated: (state, action) => {
            state.isUserProfile = action.payload; 
        }
    }
})

export const {
    setFileName, 
    setImageClick, 
    setFile,  
    isUserCreated, 
    setProfileImage, 
    setUserCreated, 
} = imageContainer.actions; 
export default imageContainer.reducer; 