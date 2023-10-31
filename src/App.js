import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "./store/AuthContext";
import Profile from "./components/ProfilePage";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
import Verification from "./components/Verification";
import ExpenseTracker from "./components/ExpenseTracker";
import { ItemProvider } from "./store/ItemContext";
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
      <Route path="/verification" element={<Verification />} />
      <Route path="/expenseTracker" element={<ItemProvider><ExpenseTracker /></ItemProvider>} />
      <Route
        path="*"
        element={
          authCtx.isLoggedIn  ? (
            <Navigate to="/home" replace />
          ) : (
            <Navigate to="/verification" replace />
          )
        }
      />
    </Routes>
  );
}


export default App;