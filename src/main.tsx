import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";

import { ThemeProvider } from "@/components/theme-provider";
import App from "./App.tsx";
import "./index.css";
import MouseFollower from "./components/mouse-follower.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <MouseFollower />
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ThemeProvider>
  </React.StrictMode>
);
