import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ResetPassword from "./pages/auth/Forgot";
import AuthLayout from "./pages/auth/Layout";
import { Route, Routes } from "react-router-dom";
import Instruction from "./pages/games/instructions/instruction";
import Select from "./pages/games/instructions/select";
import Game from "./pages/games/quizz/Index";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>
      <Route path="/instructions" element={<Instruction />} />
      <Route path="/select" element={<Select />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  );
}

export default App;
