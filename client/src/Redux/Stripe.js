import { createSlice } from "@reduxjs/toolkit";

export const Stripe = createSlice({
  name: "Stripe",
  initialState: {
    status: "",
    documentId: "",
    subscriptionId: "",
  },
  reducers: {
    setSessionStatus: (state, action) => {
      state.status = action.payload;
    },
    setDocumentId: (state, action) => {
      state.documentId = action.payload;
    },
    setSubscriptionId: (state, action) => {
      state.subscriptionId = action.payload;
    },
  },
});

export const { setSessionStatus, setDocumentId, setSubscriptionId } = Stripe.actions;
export default Stripe.reducer;
