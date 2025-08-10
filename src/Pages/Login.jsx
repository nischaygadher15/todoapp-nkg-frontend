import React, { useEffect, useState } from "react";
import { FaUnlockKeyhole, FaUser } from "react-icons/fa6";
import loginBG from "../assets/loginBG.png";
import googleLogo from "../assets/googleLogo.svg";
import twitterLogo from "../assets/twitterLogo1.svg";
import facebookLogo from "../assets/facebookLogo.svg";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { EncryptData } from "../Components/EncryptDecrypt";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useDispatch } from "react-redux";
import { updateToken } from "../Redux/tokenSclice";
import { setIsLoading } from "../Redux/loaderSlice";
import { setAuth, setUser } from "../Redux/userSlice";
import { loginUser } from "../api/user/user-api";

const Login = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let [showPass, setShowPass] = useState("password");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let clearUserData = () => {
    dispatch(updateToken(null));
    dispatch(setUser(null));
    dispatch(setAuth(false));
    sessionStorage.removeItem("todoToken");
    sessionStorage.removeItem("todoUser");
  };

  const handleLogin = async (userdata) => {
    // console.log(userdata);
    try {
      // let encryUserData = EncryptData(JSON.stringify(data));
      let data = await loginUser(userdata);
      // console.log(data);
      if (data.token && data.isAuthenticated) {
        dispatch(updateToken(data.token));
        dispatch(setUser(data.data));
        dispatch(setAuth(true));
        sessionStorage.setItem("todoToken", data.token);
        sessionStorage.setItem("todoUser", data.data);
        navigate("/dashboard", {
          state: {
            isLoggedinRightNow: true,
            message: data.message,
          },
        });
        // toast.success(data.message)
      } else {
        toast.error("Somthing is wrong");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full h-screen bg-[#ff7373] p-7 sm:p-[50px] md:p-[70px]">
      <div className="bg-white h-full rounded-lg flex">
        <div className="w-full md:w-1/2 px-7 sm:px-10 md:pe-0 md:ps-[50px] lg:ps-[70px] flex flex-col justify-center gap-7">
          {/* Sign In Form */}
          <form
            className="max-w-[400px] flex flex-col justify-center gap-4"
            onSubmit={handleSubmit(handleLogin)}
          >
            <p className="text-3xl font-semibold">Sign In</p>
            <div className="">
              <div className="relative">
                <FaUser className="absolute text-lg top-1/2 left-3 -translate-y-[10px]" />
                <input
                  type="text"
                  name="useremail"
                  {...register("useremail", {
                    required: "useremail is required!",
                    minLength: {
                      value: 3,
                      message: "useremail can be shorter then 3 characters.",
                    },
                  })}
                  className="w-full px-10 py-3 border-[1px] border-black/50 rounded-lg"
                  placeholder="Enter Email Id"
                />
              </div>
              {errors.useremail && (
                <small className="text-red-500">
                  {errors.useremail.message}
                </small>
              )}
            </div>

            <div className="">
              <div className="relative">
                <FaUnlockKeyhole className="absolute text-lg top-1/2 left-3 -translate-y-[10px]" />

                <input
                  type={`${showPass}`}
                  name="password"
                  {...register("password", {
                    required: "password is required!",
                  })}
                  className="w-full px-10 py-3 border-[1px] border-black/50 rounded-lg"
                  placeholder="Enter Password"
                />

                <button
                  type="button"
                  className="absolute p-2.5 text-xl top-1/2 right-0 -translate-y-1/2 cursor-pointer outline-none rounded-lg"
                  onClick={() => {
                    if (showPass == "password") setShowPass("text");
                    else setShowPass("password");
                  }}
                >
                  {showPass == "password" ? (
                    <>
                      <IoMdEye />
                    </>
                  ) : (
                    <>
                      <IoMdEyeOff />
                    </>
                  )}
                </button>
              </div>
              {errors.password && (
                <small className="text-red-500">
                  {errors.password.message}
                </small>
              )}
            </div>

            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                {...register("rememberMe")}
                className="h-4 w-4"
              />
              <p>Remember Me</p>
            </div>

            <div>
              <button
                type="submit"
                className="cursor-pointer px-10 py-3 bg-[#ff7777] hover:bg-[#fc8787] text-white font-semibold
                rounded"
              >
                Login
              </button>
            </div>
          </form>

          <div>
            <div className="flex flex-wrap items-center mb-2 gap-3">
              <p>Or, Login with </p>
              <div className="flex items-center gap-3">
                <a href="#">
                  <img src={facebookLogo} alt="Facebook Logo" className="w-5" />
                </a>
                <a href="#">
                  <img src={googleLogo} alt="Google Logo" className="w-5" />
                </a>
                <a href="#">
                  <img src={twitterLogo} alt="Twitter Logo" className="w-6" />
                </a>
              </div>
            </div>

            <p className="text-base flex gap-2 flex-wrap">
              <span>Don't have account?</span>
              <a
                href="/register"
                className="text-[#008bd9] font-semibold hover:underline underline-offset-2"
              >
                Create One
              </a>
            </p>
          </div>
        </div>
        <div className="hidden md:block md:w-1/2">
          <img
            src={loginBG}
            alt="Login Backgroung Photo"
            className="h-full mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
