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
import PuzzleRule from "./pages/games/puzzle/Rule";
import Cardgame from "./pages/games/cardFlip/Index";
import PuzzleQuizz from "./pages/games/puzzle/Game";
import StartPuzzzle from "./pages/games/puzzle/Start";
import Instruction_3 from "./pages/games/instructions/instruction_3";
import WordGame from "./pages/games/word/Game";
import Home from "./pages/home/Home";
import VerifyOTP from "./pages/auth/Otp";
import Trip from "./pages/games/instructions/trip";
import UserProfile from "./pages/profile/Profile";
import Achievement from "./pages/profile/achievement";
import FeedbackForm from "./pages/profile/feedback";
import UpdatePassword from "./pages/profile/updatePassword";
import StartCardGame from "./pages/games/cardFlip/Start";
import CardRule from "./pages/games/cardFlip/Rule";
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
        <Route
          path="/verify-otp"
          element={
            <PublicRoute>
              <VerifyOTP />
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
      {/* phần này riêng */}
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
          path="/trip"
          element={
            <ProtectedRoute>
              <Trip />
            </ProtectedRoute>
          }
        />
        {/* game 1 */}
        <Route
          path="/game_1"
          element={
            <ProtectedRoute>
              <QuizGame />
            </ProtectedRoute>
          }
        />
        {/* information */}
        <Route
          path="/information/:game_type"
          element={
            <ProtectedRoute>
              <Learning/>
            </ProtectedRoute>
          }
        />
        {/* game 4 */}
        <Route
          path="/game_4"
          element={
            <ProtectedRoute>
              <WordGame />
            </ProtectedRoute>
          }
        />
      </Route>
       {/* game 2 */}
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
      {/* game 3 */}
      <Route
        path="/game3"
        element={
          <ProtectedRoute>
            <QuizzLayout />
          </ProtectedRoute>
        }
      >
        <Route path="play" element={<Cardgame />} />
        <Route path="rule" element={<CardRule/>} />
        <Route index path="start" element={<StartCardGame/>} />
      </Route>
      <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
      <Route
          path="/updatePassword"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/achievement"
          element={
            <ProtectedRoute>
              <Achievement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feedback"
          element={
            <ProtectedRoute>
              <FeedbackForm />
            </ProtectedRoute>
          }
        />
    </Routes>
  );
}

export default App;
