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

// logout: don't throw on server error — return failure payload so client can still clear local state
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    // call server logout but don't surface server-side errors to the user as an error toast
    const res = await axiosInstance.get("user/logout");
    // only show success when server returns OK-ish response
    if (res && res.status >= 200 && res.status < 300) {
      toast.success("Logged out successfully");
      return res.data;
    }
    // non-2xx response: return failure payload so reducer / UI can still clear client-side state
    const message = res?.data?.message || `Logout failed (status ${res?.status})`;
    return { success: false, message };
  } catch (error) {
    // network / 4xx/5xx: do not show a 404 error toast here (was causing the 404 toast)
    // log for debugging and return a failure payload
    // console.warn("Logout request failed:", error);
    const message = error?.response?.data?.message || error.message || "Logout failed";
    return { success: false, message };
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
        }
      })
      .addCase(logout.fulfilled, (state, action) => {
        // always clear client-side auth state regardless of server response
        state.isLoggedIn = false;
        state.data = null;
        state.role = "";
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("data");
        localStorage.removeItem("role");
      });
  },
});

export const {} = auth.actions;
export default auth.reducer;

