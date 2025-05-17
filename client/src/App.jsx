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
import Contact from "./pages/contact/Contact";
import DetailPage from "./pages/contact/DetailPage";
import { AnimatePresence, motion } from "framer-motion";
import RuleWord from "./pages/games/word/Rule";
import InstructionTrip from "./pages/games/instructions/instructionsTrip";
import DetailMorePage from "./pages/contact/DetailMorePage";
import Finish from "./components/Game/Finish/Finish";
import Summary from "./components/Game/Finish/Summary";
import Community from "./pages/community/Community";
import CreatePost from "./pages/community/CreatePost";
import EditPost from "./pages/community/EditPost";
import PostDetail from "./pages/community/PostDetail";
import AIProvider from "./components/AI/AIProvider";
import UserProfilePage from "./pages/profile/post";
import History from "./pages/history/History";

import Report from "./pages/report/Report";

import TestLayout from "./pages/tests/TestLayout";
import Input from "./pages/tests/Input";
import Output from "./pages/tests/Output";

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
    <AnimatePresence mode="wait">
      <Routes>
        <Route element={<Layout bgImage={backgroundImage} />}>
          <Route path="start" element={<Start />} />
          <Route path="/" element={<Begin />} />
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
        <Route path="/home" element={<Home />} />
        <Route path="/report" element={<Report />} />
        <Route element={<QuizzLayout />}>
          <Route
            path="/quizz/rule"
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
          <Route
            path="/trip/instruction"
            element={
              <ProtectedRoute>
                <InstructionTrip />
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
          <Route
            path="/finish"
            element={
              <ProtectedRoute>
                <Finish />
              </ProtectedRoute>
            }
          />
          {/* information */}
          <Route
            path="/information"
            element={
              <ProtectedRoute>
                <Learning />
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
          <Route
            path="/summary"
            element={
              <ProtectedRoute>
                <Summary />
              </ProtectedRoute>
            }
          />
          <Route
            path="/word/rule"
            element={
              <ProtectedRoute>
                <RuleWord />
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
          <Route path="rule" element={<CardRule />} />
          <Route index path="start" element={<StartCardGame />} />
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
          path="/profile/post"
          element={
            <ProtectedRoute>
              <UserProfilePage />
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
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />
        <Route
          path="/community"
          element={
            <ProtectedRoute>
              <Community />
            </ProtectedRoute>
          }
        />
        <Route
          path="/detail/:name"
          element={
            <ProtectedRoute>
              <AIProvider>
                <DetailPage />
              </AIProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/community/*"
          element={
            <ProtectedRoute>
              <Community />
            </ProtectedRoute>
          }
        />
        <Route
          path="/community/create-post"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/community/edit-post/:postId"
          element={
            <ProtectedRoute>
              <EditPost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/community/post/:postId"
          element={
            <ProtectedRoute>
              <PostDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/detail-more"
          element={
            <AIProvider>
              <DetailMorePage />
            </AIProvider>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        <Route
          path="/input"
          element={
            <ProtectedRoute>
              <TestLayout>
                <Input />
              </TestLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/output"
          element={
            <ProtectedRoute>
              <TestLayout>
                <Output />
              </TestLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
