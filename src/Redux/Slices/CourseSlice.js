import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../Helpers/axiosInstance';
import { toast } from 'react-hot-toast';

const initialState = {
    courseData: []
}

export const getAllCourses = createAsyncThunk("course/get", async () => {
    try {
        const promise = axiosInstance.get("/course");
        toast.promise(promise, {
            pending: "Fetching courses",
            success: "Courses fetched successfully",
            error: "Failed to fetch courses"
        });
        const res = await promise;
        return res.data?.courses || [];
    } catch (error) {
        toast.error(error?.response?.data?.message || error.message || "Failed to fetch courses");
        throw error;
    }
})

const CourseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            if (action.payload) {
                state.courseData = [...action.payload];
            }
        })
    }
})
export default CourseSlice.reducer;
