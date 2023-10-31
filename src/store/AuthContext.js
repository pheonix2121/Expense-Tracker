import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  userEmail: "",
  isLoggedIn: false,
  login: (userAuthData) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = JSON.parse(localStorage.getItem("userdata"));
  const [token, setToken] = useState(initialToken ? initialToken.token : "");
  const [userEmail, setUserEmail] = useState(
    initialToken ? initialToken.userEmail : ""
  );

  const userIsLoggedIn = !!token;

  const loginHandler = (userData) => {
    console.log(userData);
    setUserEmail(userData.userEmail);
    setToken(userData.token);
    localStorage.setItem("userdata", JSON.stringify(userData));
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("userdata");
  };

  const contextValue = {
    token: token,
    userEmail: userEmail,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;