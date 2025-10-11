import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";



const initialState={
    isLoggedIn:localStorage.getItem("isLoggedIn") ||  false,
    data:localStorage.getItem('data') || {},
    role:localStorage.getItem('role') || ''
}

export const createaccount=createAsyncThunk(
    "auth/signup",
    async (data)=>{
        try {
            const res=axiosInstance.post("user/register",data);
            toast.promise(res,{
                pending:"Creating your account",
                success:"Account created successfully",
                error:"Failed to create account"
            });
            return (await res).data;
        } catch (error) {
            toast.error(error.response.data.message);
        }     
            
});

const auth=createSlice({
    name:"auth",
    initialState,
    reducers:{}
});

export const {}=auth.actions;
export default auth.reducer;

