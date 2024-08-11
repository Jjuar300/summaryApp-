import { createSlice } from "@reduxjs/toolkit";

export const feedBack = createSlice({
    name:'feedback', 
    initialState:{
        isOnClick: true, 
    }, 
    reducers:{
        setOnClick: (state, action) => {
            state.isOnClick = action.payload; 
        }
    }
}); 

export const {
 setOnClick, 
} = feedBack.actions; 
export default feedBack.reducer; 