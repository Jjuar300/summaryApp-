import { createSlice } from "@reduxjs/toolkit";

export const chatGpt  = createSlice({
    name:'chatGpt', 
    initialState: {
        chatgptId: '', 
    }, 
    reducers: {
        setChatGptId: (state, action) => {
            state.chatgptId = action.payload; 
        }
    }
}); 

export const {
    setChatGptId, 
} = chatGpt.actions; 
export default chatGpt.reducer; 