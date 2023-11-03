
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileCompletion } from "../store/AuthRedux";
import { getProfileData, updateProfile } from "../store/AuthApi";
const Profile = () => {
  const authData = useSelector(state => state.auth)
  const [fullName, setFullName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const idToken = useSelector(state => state.auth.token)

  const dispatch = useDispatch();

useEffect(() => {
setFullName(authData.isProfileCompleted ? authData.profileInformation.displayName : "");
setPhotoURL(authData.isProfileCompleted ? authData.profileInformation.photoUrl : "")
},[authData])

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handlePhotoURLChange = (event) => {
    setPhotoURL(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (fullName.trim() === "" || photoURL.trim() === "") {
      alert("Please enter full name and photo URL.");
      return;
    }

    const res = await updateProfile({
      idToken: idToken, fullName: fullName, photoURL: photoURL
    })

    const userData = await getProfileData(authData.token)

    if(userData.users[0]){
      dispatch(updateProfileCompletion({
        displayName: userData.users[0].displayName, photoUrl: userData.users[0].photoUrl
      }))
    }
    setFullName("");
    setPhotoURL("");
  };

  return (
    <div>
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={handleFullNameChange}
          />
        </div>
        <div>
          <label htmlFor="photoURL">Photo URL</label>
          <input
            type="text"
            id="photoURL"
            value={photoURL}
            onChange={handlePhotoURLChange}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;