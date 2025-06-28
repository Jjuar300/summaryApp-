import { createSlice } from "@reduxjs/toolkit";


export const Stripe = createSlice({
   name:'Stripe', 
   initialState:{
    status:null, 
   }, 
   reducers: {
    setSessionStatus: (state, action) => {
        state.status = action.payload; 
    }
   }
})

export const {setSessionStatus} = Stripe.actions; 
export default Stripe.reducer; 