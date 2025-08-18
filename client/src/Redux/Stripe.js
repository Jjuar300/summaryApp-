import { createSlice } from "@reduxjs/toolkit";


export const Stripe = createSlice({
   name:'Stripe', 
   initialState:{
    status:'', 
    subscription_Id: '', 
   }, 
   reducers: {
    setSessionStatus: (state, action) => {
        state.status = action.payload; 
    }, 
    setSubscriptionId: (state, action) =>{ 
        state.status = action.payload; 
    }
   }
})

export const {setSessionStatus, setSubscriptionId} = Stripe.actions; 
export default Stripe.reducer; 