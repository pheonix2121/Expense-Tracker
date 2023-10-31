import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "./store/AuthContext";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
import Profile from "./components/ProfilePage";
function App() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authCtx.isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [authCtx.isLoggedIn, navigate]);

  return (

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={authCtx.isLoggedIn ? null : <Navigate to="/" replace />} />
      </Routes>
  );
}

export default App;