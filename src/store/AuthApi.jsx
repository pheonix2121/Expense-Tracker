import axios from "axios";

export const updateProfileCompletionHandler = async (idToken) => {
  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCUQkIpkp-AV5ksPj3lxbd94zq0PzufhHI`,
      {
        idToken: idToken,
      }
    );
    const user = response.data.users[0];
    if (user.displayName && user.photoUrl) {
      return user;
    }
  } catch (error) {
    console.log(error);
  }
};

export const createAccount = async ({ email, password }) => {
  try {
    const response = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCUQkIpkp-AV5ksPj3lxbd94zq0PzufhHI",
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const logIn = async ({ email, password }) => {
  try {
    const response = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCUQkIpkp-AV5ksPj3lxbd94zq0PzufhHI",
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateProfile = async ({ idToken, fullName, photoURL }) => {
  try {
    const response = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCUQkIpkp-AV5ksPj3lxbd94zq0PzufhHI",
      {
        idToken: idToken,
        displayName: fullName,
        photoUrl: photoURL,
        returnSecureToken: true,
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getProfileData = async (idToken) => {
  try {
    const response = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCUQkIpkp-AV5ksPj3lxbd94zq0PzufhHI",
      {
        idToken: idToken,
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};