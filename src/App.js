import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

//pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import BotNavbar from "./components/BotNavbar";
import NewGame from "./pages/NewGame";
import MyQuestions from "./pages/my-questions/MyQuestions.jsx";
import Question from "./pages/Question";
import SaveGame from "./pages/SaveGame";

function App() {
  const { user } = useAuthContext();
  const { authIsReady } = useAuthContext();
  return (
    <div className="app">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
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
          {user && <BotNavbar />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
