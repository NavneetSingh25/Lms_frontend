import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isLoggedIn:localStorage.getItem("isLoggedIn") ||  false,
    data:localStorage.getItem('data') || {},
    role:localStorage.getItem('role') || ''
}

const auth=createSlice({
    name:"auth",
    initialState,
    reducers:{}
});

export const {}=auth.actions;
export default auth.reducer;

