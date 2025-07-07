import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useDispatch } from 'react-redux';
import { setSessionStatus } from '../Redux/Stripe';

export default function useUserPayment() {
    const [userPayment, setUserPayment] = useState(); 
    const {user} = useUser(); 
    const userId = user?.id; 
    const dispatch = useDispatch(); 
    const getSubscriptionPlan = async () => {
    try {
      const response = await fetch(`/api/userPayment/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "Application/json",
        },
      });
      const data = await response.json();
      setUserPayment(data);
    //   return dispatch(setSessionStatus(data.subscription.status))
    } catch (error) {
      return error;
    }
  };

//   useEffect(() => {
//     getSubscriptionPlan()
//   },[])
  
    return {
     userPayment,
     getSubscriptionPlan,  
  }
}
