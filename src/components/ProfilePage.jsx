
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import axios  from "axios";

const Profile = () => {
  const [fullName, setFullName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      const idToken = authCtx.token;
      try {
        const response = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCUQkIpkp-AV5ksPj3lxbd94zq0PzufhHI`,
          {
            idToken: idToken,
          }
        );
        const user = response.data.users[0];
        setFullName(user.displayName);
        setPhotoURL(user.photoUrl);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [authCtx.token]);

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
      console.log(response.data);
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
    </div>
  );
};

export default Profile;