import { createSlice } from "@reduxjs/toolkit";


export const Stripe = createSlice({
   name:'stripe', 
   initialState:{
    status:'', 
   }, 
   reducers: {
    setSessionStatus: (state, action) => {
        state.status = action.payload; 
    }
   }
})

export const {setSessionStatus} = Stripe.actions; 
export default Stripe.reducer; 