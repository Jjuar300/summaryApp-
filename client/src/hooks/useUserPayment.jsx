import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useDispatch } from 'react-redux';
import { setSessionStatus } from '../Redux/Stripe';

export default function useUserPayment() {
    const {user} = useUser(); 
    const userId = user?.id; 
    const dispatch = useDispatch();
    const getSubscriptionPlan = async () => {
    try {
      const response = await fetch(`/api/userPayment/${userId}/${user?.primaryEmailAddress}`, {
        method: "GET",
        headers: {
          "Content-Type": "Application/json",
        },
      });
      const data = await response.json();
      return dispatch(setSessionStatus(data?.hasAccess))
    } catch (error) {
      return error;
    }
  };

useEffect(() =>{
 if(userId){
   getSubscriptionPlan()
 }
  //  getSubscriptionPlan()

},[])

    return {
     getSubscriptionPlan,  
  }
}
