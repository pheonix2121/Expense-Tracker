import { createSlice } from "@reduxjs/toolkit";

const localState = JSON.parse(localStorage.getItem("userdata"));

const initialState = {
    token: localState && localState.token ?  localState.token :  "",
    userEmail: localState && localState.userEmail?  localState.userEmail :  "",
    userName: localState && localState.userName,
    isLoggedIn: localState && localState.token?  true : false,
    isProfileCompleted: false,
    profileInformation : {displayName: '', photoUrl: ''}

  }
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action) {
      const { userEmail, token, userName } = action.payload;
      state.userEmail = userEmail;
      state.token = token;
      state.userName = userName;
      state.isLoggedIn = true;
      localStorage.setItem(
        "userdata",
        JSON.stringify({
          token,
          userEmail,
          userName,
        })
      );
    },
    logout(state) {
      state.token = "";
      state.userEmail = "";
      state.userName = ''
      state.isProfileCompleted = false;
      state.isLoggedIn = false;
      state.profileInformation ={displayName: '', photoUrl: ''}
      localStorage.removeItem("userdata");
    },
    updateProfileCompletion(state, action) {
      const {displayName, photoUrl} = action.payload;
      if(displayName && photoUrl){

        state.profileInformation= { displayName: displayName, photoUrl: photoUrl}
        state.isProfileCompleted= true;
      }

    },
    setUserProfileData(state, action) {
      const { displayName, photoUrl } = action.payload;
      state.userProfileData = { displayName, photoUrl };
      state.isProfileCompleted = true;
    },
  },
});

export const { login, logout, updateProfileCompletion, setUserProfileData } = 
  authSlice.actions;

export default authSlice.reducer;