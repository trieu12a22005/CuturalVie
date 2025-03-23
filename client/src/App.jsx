import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ResetPassword from "./pages/auth/Forgot";
import Layout from "./pages/auth/Layout";
import { Route, Routes } from "react-router-dom";
import Instruction_2 from "./pages/games/instructions/instruction_2";
import Instruction_1 from "./pages/games/instructions/instruction_1";
import Begin from "./pages/auth/Begin";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="begin" element={<Begin />} />
        <Route path="/" element={<Layout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/instructions_2" element={<Instruction_2 />} />
        <Route path="/instructions_1" element={<Instruction_1 />} />
      </Route>
    </Routes>
  );
}

export default App;
