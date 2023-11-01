import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/AuthContext";
import axios from "axios";

const Verification = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigate= useNavigate();

  useEffect(() => {
    if (authCtx.isLoggedIn && authCtx.isProfileCompleted) {
      checkEmailVerification();
    }
  }, [authCtx.isLoggedIn, authCtx.isProfileCompleted]);

  const checkEmailVerification = async () => {
    const idToken = authCtx.token;
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCyl64gADY81JbozKq3BeQw11dASQRIrPE`,
        {
          idToken: idToken,
        }
      );
      const user = response.data.users[0];
      if (user.emailVerified) {
        navigate("/home");
      } else {
        sendVerificationEmail();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendVerificationEmail = async () => {
    const idToken = authCtx.token;
    try {
      await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCyl64gADY81JbozKq3BeQw11dASQRIrPE`,
        {
          requestType: "VERIFY_EMAIL",
          idToken: idToken,
        }
      );
      setIsEmailSent(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Verification Page</h1>
      {isEmailSent ? (
        <p>Verification email sent. Please check your inbox.</p>
      ) : (
        <p>Sending verification email...</p>
      )}
    </div>
  );
};

export default Verification;