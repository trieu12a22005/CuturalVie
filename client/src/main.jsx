import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { BrowserRouter as Router } from "react-router-dom";
import { AudioProvider } from "./context/AudioContext.jsx"; 
createRoot(document.getElementById("root")).render(
  <>
    <Router> {/* Router bọc App */}
      <AudioProvider>
      <Provider store={store}>
        <App />
      </Provider>
        <Toaster />
      </AudioProvider>
    </Router>
  </>
);
