import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ResetPassword from "./pages/auth/Forgot";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import Instruction_2 from "./pages/games/instructions/instruction_2";
import Instruction_1 from "./pages/games/instructions/instruction_1";
import Begin from "./pages/auth/Begin";
import { useEffect } from "react";
import Start from "./pages/games/instructions/start";
import Select from "./pages/games/instructions/select";
import Rule from "./pages/games/quizz/Rule";
import ProtectedRoute, { PublicRoute } from "./routes/ProtectedRoute";
import QuizzLayout from "./components/QuizzLayout";
import QuizGame from "./pages/games/quizz/Game";
function App() {
  const backgroundImage = "/bg/bg1.png";
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
      sessionStorage.setItem("isReloaded", "true");
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  return (
    <Routes>
      <Route element={<Layout bgImage={backgroundImage} />}>
        <Route path="start" element={<Start />} />
        <Route path="/" element={<Begin />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/instructions_2"
          element={
            <ProtectedRoute>
              <Instruction_2 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructions_1"
          element={
            <ProtectedRoute>
              <Instruction_1 />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="/select" element={<Select />} />
      <Route
        path="/game1"
        element={
          <ProtectedRoute>
            <QuizzLayout />
          </ProtectedRoute>
        }
      >
        <Route path="rule" element={<Rule />} />
        <Route path="play" element={<QuizGame />} />
      </Route>
    </Routes>
  );
}

export default App;
