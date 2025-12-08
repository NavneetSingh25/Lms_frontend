// src/Redux/Slices/LectureSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import axiosInstance from '../../Helpers/axiosInstance';

const initialState = {
  lectures: [],
};

export const getLectures = createAsyncThunk(
  'course/lectures/get',
  async (cid, thunkAPI) => {
    try {
      // backend router is /api/v1/course/:id
      const response = await axiosInstance.get(`course/${cid}`);
      const lectures = response?.data?.lectures || [];
      if (response?.data?.message) toast.success(response.data.message);
      return lectures;
    } catch (error) {
      const msg = error?.response?.data?.message || error.message || 'Failed to fetch lectures';
      toast.error(msg);
      return thunkAPI.rejectWithValue({ message: msg });
    }
  }
);

export const addLectures = createAsyncThunk(
  'course/lectures/add',
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('lecture', data.lecture);
      const response = await axiosInstance.post(`course/${data.id}`, formData);
      const createdLecture = response?.data?.lecture || response?.data?.createdLecture || null;
      if (response?.data?.message) toast.success(response.data.message);
      return { createdLecture };
    } catch (error) {
      const msg = error?.response?.data?.message || error.message || 'Failed to add lecture';
      toast.error(msg);
      return thunkAPI.rejectWithValue({ message: msg });
    }
  }
);

export const deleteLectures = createAsyncThunk(
  'course/lectures/delete',
  async ({ courseId, lectureId }, thunkAPI) => {
    try {
      // backend route: DELETE /course/lecture/:id (where :id is courseId)
      // lectureId goes in request body
      const response = await axiosInstance.delete(`course/lecture/${courseId}`, {
        data: {
          lectureId: lectureId
        }
      });
      if (response?.data?.message) toast.success(response.data.message);
      return { lectureId };
    } catch (error) {
      const msg = error?.response?.data?.message || error.message || 'Failed to delete lecture';
      toast.error(msg);
      return thunkAPI.rejectWithValue({ message: msg });
    }
  }
);

const lectureSlice = createSlice({
  name: 'lectures',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLectures.fulfilled, (state, action) => {
        state.lectures = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getLectures.rejected, (state) => {
        state.lectures = [];
      })
      .addCase(addLectures.fulfilled, (state, action) => {
        const newLecture = action.payload?.createdLecture;
        if (newLecture) {
          state.lectures.push(newLecture);
        }
      })
      .addCase(deleteLectures.fulfilled, (state, action) => {
        const idToRemove = action.payload?.lectureId || action?.meta?.arg?.lectureId;
        if (idToRemove) {
          state.lectures = state.lectures.filter((lec) => lec._id !== idToRemove);
        }
      });
  },
});

export default lectureSlice.reducer;