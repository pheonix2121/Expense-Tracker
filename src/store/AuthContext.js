import React, { useEffect, useState } from "react";
import axios from "axios";

const AuthContext = React.createContext({
  token: "",
  userEmail: "",
  userProfileData: {},
  isLoggedIn: false,
  isProfileCompleted: false,
  login: (userAuthData) => {},
  logout: () => {},
  updateProfileCompletion: (bool) => {},
});


export const AuthContextProvider = (props) => {
  const initialToken = JSON.parse(localStorage.getItem("userdata"));
  const [token, setToken] = useState(initialToken ? initialToken.token : "");
  const [userEmail, setUserEmail] = useState(
    initialToken ? initialToken.userEmail : ""
  );
  const [isProfileCompleted, setIsProfileCompleted] = useState(false);
  const [userProfileData, setUserProfileData] = useState({});

  console.log(isProfileCompleted, userProfileData)

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
    setUserProfileData({});
    localStorage.removeItem("userdata");
  };

  const updateProfileCompletionHandler = async () => {
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCUQkIpkp-AV5ksPj3lxbd94zq0PzufhHI`,
        {
          idToken: token,
        }
      );
      const user = response.data.users[0];
      if (user.displayName && user.photoUrl) {
        setUserProfileData({
          displayName: user.displayName,
          photoUrl: user.photoUrl,
        });
        setIsProfileCompleted(true);
      }

      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(userIsLoggedIn) updateProfileCompletionHandler();
  }, [token]);

  const contextValue = {
    token: token,
    userEmail: userEmail,
    userProfileData: userProfileData,
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