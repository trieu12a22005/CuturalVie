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
import Learning from "./components/Game/learning/Learning";
import Finish from "./components/Game/Finish/Finish";
import PuzzleRule from "./pages/games/puzzle/Rule";
import Cardgame from "./pages/games/cardFlip/Index";
import PuzzleQuizz from "./pages/games/puzzle/Game";
import StartPuzzzle from "./pages/games/puzzle/Start";
import Infomation from "./components/Game/Information";
import Instruction_3 from "./pages/games/instructions/instruction_3";
import WordGame from "./pages/games/word/Game";
import Home from "./pages/home/Home";
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
      <Route path="/home" element={<Home/>} />
      <Route element={<QuizzLayout />}>
        <Route
          path="/rule"
          element={
            <ProtectedRoute>
              <Rule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructions_3"
          element={
            <ProtectedRoute>
              <Instruction_3 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/game_1"
          element={
            <ProtectedRoute>
              <QuizGame />
            </ProtectedRoute>
          }
        />
        <Route
          path="/information/:game_type"
          element={
            <ProtectedRoute>
              <Infomation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/game_4"
          element={
            <ProtectedRoute>
              <WordGame />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route
        path="/game2"
        element={
          <ProtectedRoute>
            <QuizzLayout />
          </ProtectedRoute>
        }
      >
        <Route path="play" element={<PuzzleQuizz />} />
        <Route index path="start" element={<StartPuzzzle />} />
        <Route path="rule" element={<PuzzleRule />} />
      </Route>
      <Route
        path="/game3"
        element={
          <ProtectedRoute>
            <QuizzLayout />
          </ProtectedRoute>
        }
      >
        <Route path="play" element={<Cardgame />} />
      </Route>
    </Routes>
  );
}

export default App;
