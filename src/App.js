import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

//pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Profile from "./pages/profile/Profile";
import MyGames from "./pages/profile/MyGames";
import AddedQuestions from "./pages/profile/AddedQuestions";
import BotNavbar from "./components/BotNavbar";
import NewGame from "./pages/NewGame";
import MyQuestions from "./pages/my-questions/MyQuestions.jsx";
import Question from "./pages/Question";
import SaveGame from "./pages/SaveGame";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();
  const { user } = useAuthContext();
  const { authIsReady } = useAuthContext();
  return (
    <div className="app">
      {authIsReady && (
        <>
          <Navbar />
          <AnimatePresence>
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={user ? <Home /> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={user ? <Navigate to="/" /> : <Login />}
              />
              <Route
                path="/register"
                element={user ? <Navigate to="/" /> : <Register />}
              />
              <Route
                path="/profile"
                element={user ? <Profile /> : <Navigate to="/login" />}
              />
              <Route
                path="/profile/game-records"
                element={user ? <MyGames /> : <Navigate to="/login" />}
              />
              <Route
                path="/profile/added-questions"
                element={user ? <AddedQuestions /> : <Navigate to="/login" />}
              />
              <Route
                path="/new-game"
                element={user ? <NewGame /> : <Navigate to="/login" />}
              />
              <Route
                path="/my-questions"
                element={user ? <MyQuestions /> : <Navigate to="/login" />}
              />
              <Route
                path="/new-game/play"
                element={user ? <Question /> : <Navigate to="/login" />}
              />
              <Route
                path="/new-game/save"
                element={user ? <SaveGame /> : <Navigate to="/login" />}
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </AnimatePresence>
          {user && <BotNavbar />}
        </>
      )}
    </div>
  );
}

export default App;
