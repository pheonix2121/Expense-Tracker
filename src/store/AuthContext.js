import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  userEmail: "",
  isLoggedIn: false,
  isProfileCompleted: false,
  login: (userAuthData) => {},
  logout: () => {},
  updateProfileCompletion: (isCompleted) => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = JSON.parse(localStorage.getItem("userdata"));
  const [token, setToken] = useState(initialToken ? initialToken.token : "");
  const [userEmail, setUserEmail] = useState(
    initialToken ? initialToken.userEmail : ""
  );
  const [isProfileCompleted, setIsProfileCompleted] = useState(
    initialToken ? initialToken.isProfileCompleted : false
  );

  const userIsLoggedIn = !!token;

  const loginHandler = (userData) => {
    setUserEmail(userData.userEmail);
    setToken(userData.token);
    setIsProfileCompleted(userData.isProfileCompleted);
    localStorage.setItem(
      "userdata",
      JSON.stringify({
        token: userData.token,
        userEmail: userData.userEmail,
        isProfileCompleted: userData.isProfileCompleted,
      })
    );
  };
  const logoutHandler = () => {
    setToken(null);
    setUserEmail("");
    setIsProfileCompleted(false);
    localStorage.removeItem("userdata");
  };
  const updateProfileCompletionHandler = (isCompleted) => {
    setIsProfileCompleted(isCompleted);
  };

  const contextValue = {
    token: token,
    userEmail: userEmail,
    isLoggedIn: userIsLoggedIn,
    isProfileCompleted: isProfileCompleted,
    login: loginHandler,
    logout: logoutHandler,
    updateProfileCompletion: updateProfileCompletionHandler,
  };
  
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;