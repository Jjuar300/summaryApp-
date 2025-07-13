import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import NotFound from "../../pages/NotFound/Index";
import LandingPage from "../../pages/LandingPage/index";
import SubscriptionPlan from '../../pages/SubscriptionPlan/Index'

export default function index() {
  return (
    <>
      {/* <BrowserRouter> */}
        <Routes>
          <Route path="/Noto" element={<LandingPage />} />
          {/* <Route path="/subscriptionPlan" element={<SubscriptionPlan/>} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      {/* </BrowserRouter> */}
    </>
  );
}
