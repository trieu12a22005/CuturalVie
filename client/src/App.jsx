import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ResetPassword from "./pages/auth/Forgot";
import AuthLayout from "./pages/auth/Layout";
import { Route, Routes } from "react-router-dom";
import Instruction from "./pages/games/instructions/instruction";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>
      <Route path="/instructions" element={<Instruction />} />
    </Routes>
  );
}

export default App;
