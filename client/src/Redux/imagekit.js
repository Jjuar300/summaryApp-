import { createSlice } from "@reduxjs/toolkit";

const imagekitData = new createSlice({
    name: 'imagekitData', 
    initialState: {
        path: '', 
    }, 
    reducers: {
        setSuccessData: (state, action) => {
            state.path = action.payload; 
        }, 
    }
}); 

export const { setSuccessData} = imagekitData.actions; 
export default imagekitData.reducer; 
