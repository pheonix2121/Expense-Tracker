import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import Profile from "./components/ProfilePage";
import Verification from "./components/Verification";
import ExpenseTracker from "./components/ExpenseTracker";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "./store/ItemApi";
import { setItems } from "./store/ItemRedux";
import { getProfileData } from "./store/AuthApi";
import { updateProfileCompletion } from "./store/AuthRedux";
import classes from "./App.module.css";
const App = () => {
  const authData = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const isDark = useSelector((state) => state.auth.isDark);
  const themeClass = isDark ? "dark-theme" : "light-theme";

  const fetchItemsAndDataFromServer = async () => {
    const modifiedEmail = authData.userEmail.replace(/[@.]/g, "-");
    const data = await fetchItems(modifiedEmail);
    const userData = await getProfileData(authData.token);

    if (userData.users[0]) {
      dispatch(
        updateProfileCompletion({
          displayName: userData.users[0].displayName,
          photoUrl: userData.users[0].photoUrl,
        })
      );
    }

    dispatch(setItems(data ? data : []));
  };

  useEffect(() => {
    if (authData.token.length !== 0) fetchItemsAndDataFromServer();
  }, [authData.token]);

  return (
    <div className={classes.container + " " + classes[themeClass]}>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/verification" element={<Verification />} />
          <Route exact path="/expenseTracker" element={<ExpenseTracker />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;