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
    const res = await axiosInstance.post("user/register", data);
    if (res.data?.success) {
      toast.success(res.data?.message || "Account created successfully");
    }
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message || "Signup failed");
    throw error;
  }
});

export const login = createAsyncThunk("auth/login", async (data) => {
  try {
    const res = await axiosInstance.post("user/login", data);
    if (res.data?.success) {
      toast.success(res.data?.message || "Login successful");
    }
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message || "Login failed");
    throw error;
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const res = await axiosInstance.post("user/logout");
    if (res.status >= 200 && res.status < 300) {
      return { success: true, message: "Logged out successfully" };
    }
    return { success: false, message: "Logout failed on server" };
  } catch (error) {
    console.warn("Server logout failed:", error.message);
    return { success: true, message: "Logged out (server unavailable)" };
  }
});

export const updateProfile = createAsyncThunk("/user/update/profile", async (data) => {
    try {
        const res = axiosInstance.put(`user/update`, data[1]);
        toast.promise(res, {
            loading: "Wait! profile update in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to update profile"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})

export const getUserData = createAsyncThunk("/user/details", async () => {
    try {
        const res = axiosInstance.get("user/me");
        return (await res).data;
    } catch(error) {
        toast.error(error.message);
    }
})

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
        state.isLoggedIn = false;
        state.data = null;
        state.role = "";
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("data");
        localStorage.removeItem("role");
        localStorage.removeItem("token");
        toast.success(action.payload?.message || "Logged out successfully");
      })
      .addCase(getUserData.fulfilled, (state, action) => {
            if(!action?.payload?.user) return;
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role
        });
  },
});

export const {} = auth.actions;
export default auth.reducer;

