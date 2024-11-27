import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home.tsx";
import Auth from "./components/pages/Auth.tsx";

export default function Main() {
  return (
    <NextUIProvider>
      <main className="dark text-foreground bg-background">
        <BrowserRouter>
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/app" element={<App />} />
          </Routes>
        </BrowserRouter>
      </main>
    </NextUIProvider>
  );
}

createRoot(document.getElementById("root")!).render(<Main />);
