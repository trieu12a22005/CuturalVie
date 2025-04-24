import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { AudioProvider } from "./context/AudioContext.jsx";

import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store.js"; // dùng named export đúng

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <AudioProvider>
            <App />
            <Toaster />
          </AudioProvider>
        </Router>
      </PersistGate>
    </Provider>
  </StrictMode>
);
