import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "./Slices/AuthSlice.js";
import courseSliceReducer from "./Slices/CourseSlice.js";
import rajorpaySliceReducer from "./Slices/RajorPaySlice.js";
import lectureSliceReducer from "./Slices/LectureSlice.js";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course: courseSliceReducer,
    rajorpay:rajorpaySliceReducer,
    lectures: lectureSliceReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;