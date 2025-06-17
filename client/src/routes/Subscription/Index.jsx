import { Route, Routes, BrowserRouter } from "react-router-dom";
import { SubscriptionPlan } from "../../pages/index";
import { SettingsPage } from "../../pages/index";

export default function Index() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/subscription" element={<SubscriptionPlan />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
