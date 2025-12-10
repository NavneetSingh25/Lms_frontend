import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  allUsersCount: 0,
  subscribedCount: 0,
  totalAdmins: 0,
  totalCourses: 0,
  totalPayments: 0,
  totalRevenue: 0,
  recentSignups: [],
  monthlySalesRecord: [], // 12-length array derived from monthlySignups
  loading: false,
  error: null,
};

export const getStatsData = createAsyncThunk("stats/get", async (_, thunkAPI) => {
  try {
    const promise = axiosInstance.get("admin/stats/userstats");
    toast.promise(promise, {
      loading: "Loading the data...",
      success: (res) => res?.data?.message ?? "Data loaded",
      error: "Failed to load data",
    });
    const response = await promise;
    return response.data;
  } catch (error) {
    const message = error?.response?.data?.message ?? error?.message ?? "Something went wrong";
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

function toMonthlyArray(monthlySignups = []) {
  // Aggregate counts by month across years; index 0 → Jan ... 11 → Dec
  const arr = Array(12).fill(0);
  for (const item of monthlySignups) {
    const m = Number(item?.month);
    const c = Number(item?.count) || 0;
    if (m >= 1 && m <= 12) arr[m - 1] += c;
  }
  return arr;
}

const statSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStatsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStatsData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        // The response shape per Postman:
        // { success: true, stats: { totalUsers, totalAdmins, totalSubscribers, totalCourses, totalPayments, totalRevenue, recentSignups, monthlySignups } }
        const stats = action.payload?.stats ?? {};

        state.allUsersCount = stats.totalUsers ?? 0;
        state.subscribedCount = stats.totalSubscribers ?? 0;
        state.totalAdmins = stats.totalAdmins ?? 0;
        state.totalCourses = stats.totalCourses ?? 0;
        state.totalPayments = stats.totalPayments ?? 0;
        state.totalRevenue = stats.totalRevenue ?? 0;
        state.recentSignups = Array.isArray(stats.recentSignups) ? stats.recentSignups : [];
        state.monthlySalesRecord = toMonthlyArray(stats.monthlySignups);
      })
      .addCase(getStatsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error?.message ?? "Failed to load stats";
      });
  },
});

export default statSlice.reducer;