
import React, { useEffect, useState } from "react";

const Verification = ({
  isLoggedIn,
  isProfileCompleted,
  token,
  verifyEmail,
}) => {
  const [isEmailSent, setIsEmailSent] = useState(false);

  useEffect(() => {
    if (isLoggedIn && isProfileCompleted) {
      checkEmailVerification();
    }
  }, [isLoggedIn, isProfileCompleted]);

  const checkEmailVerification = async () => {
    try {
      await verifyEmail(token);
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