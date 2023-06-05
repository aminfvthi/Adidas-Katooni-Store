import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LoginModalContextProvider } from "./contexts/LoginModalContext";
import { UserContextProvider } from "./contexts/UserContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserContextProvider>
      <LoginModalContextProvider>
        <App />
      </LoginModalContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
