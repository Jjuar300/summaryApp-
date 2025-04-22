import { createSlice } from "@reduxjs/toolkit";

export const homePage = createSlice({
    name:'homePage', 
    initialState: {
        open: true, 
    }, 
    reducers: {
        setOpen: (state, action) =>{ 
            state.open = action.payload; 
        }, 
    }
})

export const {
    setOpen, 
} = homePage.actions; 
export default homePage.reducer; 