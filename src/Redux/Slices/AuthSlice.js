import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
  data: JSON.parse(localStorage.getItem("data")) || null,
  role: localStorage.getItem("role") || "",
};

export const createaccount = createAsyncThunk("auth/signup", async (data) => {
  try {
    const promise = axiosInstance.post("user/register", data);
    toast.promise(promise, {
      pending: "Creating your account",
      success: "Account created successfully",
      error: "Failed to create account",
    });
    const res = await promise;
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message || "Signup failed");
    throw error;
  }
});

export const login = createAsyncThunk("auth/login", async (data) => {
  try {
    const promise = axiosInstance.post("user/login", data);
    toast.promise(promise, {
      pending: "wait! authentication in progress..",
      success: "login successful",
      error: "Failed to login",
    });
    const res = await promise;
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message || "Login failed");
    throw error;
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const res = await axiosInstance.post("user/logout");
    // only show success if server responds OK
    if (res.status >= 200 && res.status < 300) {
      return { success: true, message: "Logged out successfully" };
    }
    return { success: false, message: "Logout failed on server" };
  } catch (error) {
    // server error (404, 500, etc) — but we still want to clear client state
    // return success so reducer clears local auth
    console.warn("Server logout failed:", error.message);
    return { success: true, message: "Logged out (server unavailable)" };
  }
});

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const payload = action.payload || {};
        const user = payload.data || payload.user || null;
        if (payload?.success && user) {
          state.isLoggedIn = true;
          state.data = user;
          state.role = user.role || "";
          localStorage.setItem("isLoggedIn", JSON.stringify(true));
          localStorage.setItem("data", JSON.stringify(user));
          localStorage.setItem("role", user.role || "");
          const token = payload.token || payload.accessToken || payload.jwtToken;
          if (token) {
            localStorage.setItem("token", token);
          }
        }
      })
      .addCase(logout.fulfilled, (state, action) => {
        // always clear client state regardless of server response
        state.isLoggedIn = false;
        state.data = null;
        state.role = "";
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("data");
        localStorage.removeItem("role");
        localStorage.removeItem("token");
        // show success toast in reducer
        toast.success(action.payload?.message || "Logged out successfully");
      });
  },
});

export const {} = auth.actions;
export default auth.reducer;

