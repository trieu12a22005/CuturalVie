import { createContext, useContext, useState, useEffect, useRef } from "react";

const loginModalContext = createContext();


export function AudioProvider({ children }) {
 const [showLoginModal, setShowLoginModal] = useState(false);
  return (
    <loginModalContext.Provider value={{showLoginModal,setShowLoginModal}}>
      {children}
    </loginModalContext.Provider>
  );
}

// Hook để sử dụng AudioContext
export function useLoginModal() {
  return useContext(loginModalContext);
}
