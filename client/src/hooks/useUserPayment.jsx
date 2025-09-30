import { useUser } from "@clerk/clerk-react";
import { useDispatch } from "react-redux";
import { setDocumentId, setSessionStatus, setSubscriptionId } from "../Redux/Stripe";

export default function useUserPayment() {
  const { user } = useUser();
  const userId = user?.id;
  const dispatch = useDispatch();
  const productionAPI = import.meta.env.VITE_PRODUCTION_API_URL; 

  const getSubscriptionPlan = async () => {
    try {
      const response = await fetch(
        `/${productionAPI}/userPayment/${userId}/${user?.primaryEmailAddress}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
      const data = await response.json();
      console.log('data user payment:', data)
      dispatch(setDocumentId(data?._id));
      dispatch(setSubscriptionId(data?.subscriptionId))
      return dispatch(setSessionStatus(data?.hasAccess));
    } catch (error) {
      return error;
    }
  };

  return {
    getSubscriptionPlan,
  };
}
