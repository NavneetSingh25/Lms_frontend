// src/Redux/Slices/CourseSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import { toast } from "react-hot-toast";

const initialState = {
  courseData: [],
};

// ✅ Fetch all courses
export const getAllCourses = createAsyncThunk("course/getAll", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/course");
    return res.data?.courses || [];
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to fetch courses");
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// ✅ Create new course
export const createNewCourse = createAsyncThunk("course/create", async (data, thunkAPI) => {
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("createdBy", data.createdBy);
    formData.append("thumbnail", data.thumbnail);

    const response = axiosInstance.post("/course", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    toast.promise(response, {
      loading: "Creating new course...",
      success: "Course created successfully",
      error: "Failed to create course",
    });

    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Course creation failed");
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// ✅ Slice
const CourseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.courseData = action.payload;
      })
      .addCase(getAllCourses.rejected, (state) => {
        state.courseData = [];
      });
  },
});

export default CourseSlice.reducer;