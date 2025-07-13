import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { Provider } from "react-redux";
import store from "./Redux/store.js";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const PUBLISHIBLE_CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <ClerkProvider
        publishableKey={PUBLISHIBLE_CLERK_KEY}
        afterSignInUrl="/subscriptionPlan"
        afterSignOutUrl="/Noto"
     >
        <PersistGate persistor={persistStore(store)}>
          <App />
        </PersistGate>
      </ClerkProvider>
    </React.StrictMode>
  </Provider>
);
