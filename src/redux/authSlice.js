import { createSlice } from "@reduxjs/toolkit";

// Helper to safely read from localStorage
const getUserFromStorage = () => {
  try {
    const storedUser = localStorage.getItem("userInfo");
    if (!storedUser) return null;
    return JSON.parse(storedUser);
  } catch (error) {
    console.error("Failed to parse user info:", error);
    return null;
  }
};

const getTokenFromStorage = () => {
  return localStorage.getItem("token") || null;
};

const initialState = {
  user: getUserFromStorage(),
  token: getTokenFromStorage(),
  // If we have a token, we consider the user authenticated
  isAuthenticated: !!getTokenFromStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;

      // Save to storage
      localStorage.setItem("userInfo", JSON.stringify(user));
      localStorage.setItem("token", token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      // Clear storage
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;