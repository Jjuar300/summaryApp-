import { Route, Routes} from "react-router-dom";
import NotFound from "../../pages/NotFound/Index";
import LandingPage from "../../pages/LandingPage/index";

export default function index() {
  return (
    <>
      {/* <BrowserRouter> */}
        <Routes>
          <Route path="/Noto" element={<LandingPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      {/* </BrowserRouter> */}
    </>
  );
}
