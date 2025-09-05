import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { Provider } from "react-redux";
import store from "./Redux/store.js";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";

const PUBLISHIBLE_CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
console.log('clientUrl:', import.meta.env.VITE_CLERK_PRODUCTION_AFTERSIGNIN_REDIRECT_URL)
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <ClerkProvider
        publishableKey={PUBLISHIBLE_CLERK_KEY}
        afterSignInUrl={'/BrowseSpace'}
        afterSignUpUrl={ '/SubscriptionPlan' }
        afterSignOutUrl="/Noto"
      >
        <PersistGate persistor={persistStore(store)}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </ClerkProvider>
    </React.StrictMode>
  </Provider>
);
