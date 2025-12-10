import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  key: "",
  subscription_id: "",
  isPaymentVerified: false,
  allPayments: [],
  finalMonths: {},
  monthlySalesRecord: [],
  loading: false,
  error: null,
};

export const getRazorPayId = createAsyncThunk("payments/getKey", async (_, thunkAPI) => {
  try {
    const { data } = await axiosInstance.get("/payments/razorpay-key");
    return { key: data?.key || "" };
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to load Razorpay key");
    return thunkAPI.rejectWithValue(error?.response?.data || error.message);
  }
});

export const purchaseCourseBundle = createAsyncThunk(
  "payments/subscribe",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/payments/subscribe");
      toast.success(data?.message || "Subscription purchased successfully");
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Subscription failed");
      return rejectWithValue(error.response?.data);
    }
  }
);

export const verifyUserPayment = createAsyncThunk(
  "payments/verify",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/payments/verify", payload);
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Verification failed");
      return rejectWithValue(error.response?.data);
    }
  }
);

export const cancelCourseBundle = createAsyncThunk("/payments/cancel", async (_, { rejectWithValue }) => {
  try {
    const response = axiosInstance.post("/payments/unsubscribe");
    toast.promise(response, {
      loading: "Unsubscribing the bundle",
      success: (data) => data?.data?.message || "Unsubscribed",
      error: "Failed to unsubscribe",
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Cancellation failed");
    return rejectWithValue(error.response?.data);
  }
});

export const getPaymentRecord = createAsyncThunk(
  "/payments/record",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/payments?count=100");
      // response.data shape: { success, data: { ... } } or { success, payments: [...], ... }
      return response.data;
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || "Failed to fetch payment records";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const razorpaySlice = createSlice({
  name: "razorpay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRazorPayId.fulfilled, (state, action) => {
        state.key = action?.payload?.key || "";
      })
      .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
        state.subscription_id =
          action?.payload?.subscription_id || action?.payload?.subscriptionId || "";
      })
      .addCase(verifyUserPayment.fulfilled, (state, action) => {
        toast.success(action?.payload?.message || "Payment verified");
        state.isPaymentVerified = !!action?.payload?.success;
      })
      .addCase(verifyUserPayment.rejected, (state) => {
        state.isPaymentVerified = false;
      })
      .addCase(getPaymentRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPaymentRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const payload = action?.payload || {};
        // Backend may return: { success, data: { ... } } or direct { allPayments, ... }
        const data = payload?.data || payload;

        state.allPayments = Array.isArray(data?.allPayments)
          ? data.allPayments
          : Array.isArray(data?.payments)
          ? data.payments
          : [];
        state.finalMonths = data?.finalMonths || {};
        state.monthlySalesRecord = Array.isArray(data?.monthlySalesRecord)
          ? data.monthlySalesRecord
          : [];
      })
      .addCase(getPaymentRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load payment records";
        // Keep defaults
        state.allPayments = [];
        state.monthlySalesRecord = [];
      });
  },
});

export default razorpaySlice.reducer;