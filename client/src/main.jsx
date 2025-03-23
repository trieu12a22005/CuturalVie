import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { AudioProvider } from "./components/AudioContext.jsx"; // Import AudioProvider
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router> {/* Router bọc App */}
      <AudioProvider>
        <App />
        <Toaster />
      </AudioProvider>
    </Router>
  </StrictMode>
);
