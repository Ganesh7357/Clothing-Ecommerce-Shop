import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Helper from "../../lip/Helper";

const initialState = {
  userId: null,
  isLoggedIn: false,
  darkMode: true,
};

const userData = localStorage.getItem('userData');
if (userData) {
  const parsedUserData = userData;
  initialState.userId = parsedUserData._id;
  initialState.isLoggedIn = true;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state) => {
      const userData = localStorage.getItem('userData');
      console.log('userData====>',userData)
      if (userData) {
        // const parsedUserData = userData;
        state.userId = userData;
        state.isLoggedIn = true;
        console.log('User logged in:', state.userId);
      } else {
        console.log('No user data found in localStorage');
      }
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.userId = null;
      localStorage.removeItem('userData');
      console.log('User logged out');
      toast.success("You have successfully logged out");
    },
    changeMode: (state) => {
      state.darkMode = !state.darkMode;
      console.log('Dark mode:', state.darkMode);
      if (state.darkMode) {
        document.querySelector('html').setAttribute('data-theme', "dark");
      } else {
        document.querySelector('html').setAttribute('data-theme', "winter");
      }
    },
  },
});

console.log('Initial localStorage.getItem("userData"):', localStorage.getItem('userData'));
console.log('Initial localStorage.getItem("token"):', localStorage.getItem('token'));

export const { loginUser, logoutUser, changeMode } = authSlice.actions;

export default authSlice.reducer;
