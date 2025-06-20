import { Route, Routes } from "react-router-dom";

import {
  SettingsPage,
  Home,
  NotFound,
  BrowseSpace,
  Summary,
} from "../../pages";

export default function index() {
  
  return (
    <>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path={`/spaces/:id`} element={<Home />} />
          <Route path="/" element={<BrowseSpace />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
    </>
  );
}
