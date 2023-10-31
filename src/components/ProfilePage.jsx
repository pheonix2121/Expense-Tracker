
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import { useNavigate } from "react-router-dom";import axios  from "axios";

const Profile = () => {
  const authCtx = useContext(AuthContext);
  const [fullName, setFullName] = useState(authCtx.userProfileData.displayName || "");
  const [photoURL, setPhotoURL] = useState(authCtx.userProfileData.photoUrl || "");

  const navigate= useNavigate();
  function goToHome(){
    navigate("/home")
  }
  

  const saveProfileHandler = async () => {
    const idToken = authCtx.token;
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCyl64gADY81JbozKq3BeQw11dASQRIrPE`,
        {
          idToken: idToken,
          displayName: fullName,
          photoUrl: photoURL,
          returnSecureToken	: true
        }
      );
      authCtx.updateProfileCompletion();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <label>Your Full Name</label>
      <input
        type="text"
        id="name"
        value={fullName}
        onChange={(event) => setFullName(event.target.value)}
      />
      <label>Profile Photo URL</label>
      <input
        type="text"
        id="dp"
        value={photoURL}
        onChange={(event) => setPhotoURL(event.target.value)}
      />
      <button onClick={saveProfileHandler}>Update</button>
      <button onClick={goToHome}>Go To Home</button>
    </div>
  );
};

export default Profile;