import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./store/store.js";

import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { AudioProvider } from "./components/AudioContext.jsx"; 
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router> {/* Router bọc App */}
      <AudioProvider>
      <Provider store={store}>
        <App />
      </Provider>
        <Toaster />
      </AudioProvider>
    </Router>
  </StrictMode>
);
