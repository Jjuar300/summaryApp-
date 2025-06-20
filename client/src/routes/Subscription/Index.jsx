import { Route, Routes } from "react-router-dom";
import { SettingsPage, SubscriptionPlan, Payment } from "../../pages/index";
import { NotFound } from "../../pages/index";

export default function Index() {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/" element={<SubscriptionPlan />} />
        <Route path="/subScriptionForm" element={<Payment />} />
      </Routes>
    </>
  );
}
