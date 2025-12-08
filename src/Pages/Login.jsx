import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

import HomeLayout from "../Layouts/HomeLayout";
import { login } from "../Redux/Slices/AuthSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData((s) => ({ ...s, [name]: value }));
  }

  async function onLogin(e) {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      toast.error("All fields are required");
      return;
    }

    if (loginData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (!loginData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      toast.error("Invalid email address");
      return;
    }

      try {
      const payload = await dispatch(login(loginData)).unwrap();

      if (payload?.success) {
        toast.success("Login successful");

        // ✅ Store token in localStorage
        if (payload?.token) {
          localStorage.setItem("token", payload.token);
        } else {
          toast.error("Token missing from response");
          return;
        }

        setLoginData({ email: "", password: "" });
        navigate("/");
      } else {
        toast.error(payload?.message || "Login failed");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || "Login failed");
    }
  }

  return (
    <HomeLayout>
      <div className="flex justify-center items-center mt-0 mb-10 overflow-y-hidden ">
        <form
          onSubmit={onLogin}
          className="flex flex-col justify-center gap-3 rounded-lg p-4 w-96 text-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),_0_2px_4px_-1px_rgba(0,0,0,0.06)] bg-gray-800"
        >
          <h1 className="text-center text-2xl font-bold"> Login Page </h1>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="Enter your email..."
              className="bg-transparent px-2 py-1 border"
              onChange={handleUserInput}
              value={loginData.email}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder="Enter your password..."
              className="bg-transparent px-2 py-1 border"
              onChange={handleUserInput}
              value={loginData.password}
            />
          </div>

          <button
            type="submit"
            className="bg-yellow-600 mt-2 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-1 font-semibold text-lg cursor-pointer"
          >
            Login
          </button>

          <p className="text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}
export default Login;