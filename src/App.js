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
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const App = () => {
  const authData = useSelector(state => state.auth);
  const  dispatch = useDispatch()
  console.log(authData)

  const fetchItemsAndDataFromServer = async () => {
    const modifiedEmail = authData.userEmail.replace(/[@.]/g, "-");
    const data = await fetchItems(modifiedEmail);
    const userData = await getProfileData(authData.token)
    console.log(userData)
    if(userData.users[0]){
      dispatch(updateProfileCompletion({
        displayName: userData.users[0].displayName, photoUrl: userData.users[0].photoUrl
      }))
    }

    dispatch(setItems(data ? data : []))
  };


  useEffect(() => {
    if(authData.token.length != 0)
    fetchItemsAndDataFromServer();
  },[])

  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage/>} />
          <Route exact path="/home" element={<Home/>} />
          <Route exact path="/profile" element={<Profile/>} />
          <Route exact path="/verification" element={<Verification/>} />
          <Route exact path="/expenseTracker" element={<ExpenseTracker/>} />
        </Routes>
      </Router>
  );
};

export default App;