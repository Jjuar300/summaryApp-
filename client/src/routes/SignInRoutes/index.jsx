import { Route, Routes, BrowserRouter } from "react-router-dom";

import { SettingsPage, Home, NotFound } from "../../pages";

export default function index() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path={`/spaces/:id`} element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
