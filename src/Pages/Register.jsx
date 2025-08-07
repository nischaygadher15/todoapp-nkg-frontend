import React, { useCallback, useState } from "react";
import registerBG from "../assets/registerBG.png";
import { FaUserEdit } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { IoMdEye, IoMdEyeOff, IoMdLock } from "react-icons/io";
import { MdEmail, MdLockOutline } from "react-icons/md";
import axios from "axios";
import { DecryptData, EncryptData } from "../Components/EncryptDecrypt";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../Redux/loaderSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const Register = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [showPass, setShowPass] = useState("password");
  let [showConfPass, setShowConfPass] = useState("password");

  let {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({});

  let onSubmit = async (data) => {
    console.log(data);
    // let encryptedData = EncryptData(JSON.stringify(data));
    dispatch(setIsLoading(true));

    try {
      let res = await axios.post("http://localhost:3000/register", {
        data,
      });
      console.log(res);
      // dispatch(setIsLoading(false));
      if (res.data.isRegistered) {
        reset();
        navigate("/login");
        toast.success("You have successfully registered.");
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status != 400) {
        toast.error(error.response.data.message);
      } else {
        console.log(error.response.data.errors);
        toast.error("somthing went wrong");
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <div className="w-full max-w-screen min-h-screen bg-[#ff7373] p-7 sm:p-[50px] md:p-[70px]">
      <div className="bg-white h-full rounded-lg flex">
        <div className="order-2 w-full md:w-1/2 p-7 flex flex-col justify-center gap-7">
          {/* Sign In Form */}
          <form
            className="max-w-[400px] flex flex-col justify-center gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="text-3xl font-semibold">Sign Up</p>

            {/* ---------------First Name-------------- */}
            <div className="">
              <div className="relative">
                <FaUserEdit className="absolute text-lg top-1/2 left-3 -translate-y-[10px]" />
                <input
                  type="text"
                  className="w-full px-10 py-3 border-[1px] border-black/50 rounded-lg"
                  placeholder="Enter Firstname"
                  {...register("firstname", {
                    required: {
                      value: true,
                      message: "firstname is required!",
                    },
                    minLength: {
                      value: 3,
                      message: "firstname can not be less than 3 characters.",
                    },
                  })}
                />
              </div>
              {errors.firstname && (
                <small className="text-red-500">
                  {errors.firstname.message}
                </small>
              )}
            </div>

            {/* ---------------Last Name-------------- */}
            <div className="">
              <div className="relative">
                <FaUserEdit className="absolute text-lg top-1/2 left-3 -translate-y-[10px]" />
                <input
                  type="text"
                  className="w-full px-10 py-3 border-[1px] border-black/50 rounded-lg"
                  placeholder="Enter Lastname"
                  {...register("lastname", {
                    required: {
                      value: true,
                      message: "lastname is required!",
                    },
                    minLength: {
                      value: 3,
                      message: "lastname can not be less than 3 characters.",
                    },
                  })}
                />
              </div>
              {errors.lastname && (
                <small className="text-red-500">
                  {errors.lastname.message}
                </small>
              )}
            </div>

            {/* ---------------UserName-------------- */}
            <div className="">
              <div className="relative">
                <FaUser className="absolute text-lg top-1/2 left-3 -translate-y-[10px]" />
                <input
                  type="text"
                  className="w-full px-10 py-3 border-[1px] border-black/50 rounded-lg"
                  placeholder="Enter Username"
                  {...register("username", {
                    required: {
                      value: true,
                      message: "username is required!",
                    },
                    minLength: {
                      value: 3,
                      message: "username can not be less than 3 characters.",
                    },
                  })}
                />
              </div>
              {errors.username && (
                <small className="text-red-500">
                  {errors.username.message}
                </small>
              )}
            </div>

            {/* ---------------Email-------------- */}
            <div className="">
              <div className="relative">
                <MdEmail className="absolute text-lg top-1/2 left-3 -translate-y-[10px]" />
                <input
                  type="text"
                  className="w-full px-10 py-3 border-[1px] border-black/50 rounded-lg"
                  placeholder="Enter Email"
                  {...register("useremail", {
                    required: {
                      value: true,
                      message: "useremail is required!",
                    },
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "invalid email format",
                    },
                  })}
                />
              </div>
              {errors.useremail && (
                <small className="text-red-500">
                  {errors.useremail.message}
                </small>
              )}
            </div>

            {/* ---------------Password-------------- */}
            <div className="">
              <div className="relative">
                <IoMdLock className="absolute text-lg top-1/2 left-3 -translate-y-[10px]" />
                <input
                  type={`${showPass}`}
                  className="w-full px-10 py-3 border-[1px] border-black/50 rounded-lg"
                  placeholder="Enter Password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "password is required!",
                    },
                    minLength: {
                      value: 6,
                      message: "password must have minimum 6 characters.",
                    },
                    pattern: {
                      value: /[0-9]+/,
                      message: "password must have one digit",
                    },
                  })}
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

            {/* ---------------Confirm Password-------------- */}
            <div className="">
              <div className="relative">
                <MdLockOutline className="absolute text-lg top-1/2 left-3 -translate-y-[10px]" />
                <input
                  type={`${showConfPass}`}
                  className="w-full px-10 py-3 border-[1px] border-black/50 rounded-lg"
                  placeholder="Enter Confirm Password"
                  {...register("cnfpassword", {
                    required: {
                      value: true,
                      message: "Confirm Password is required!",
                    },
                    minLength: {
                      value: 6,
                      message: "password must have minimum 6 characters.",
                    },
                    pattern: {
                      value: /[0-9]+/,
                      message: "password must have one digit",
                    },
                    validate: {
                      isSamePassword: (value) =>
                        value == getValues("password") ||
                        "Password do not match",
                    },
                  })}
                />

                <button
                  type="button"
                  className="absolute p-2.5 text-xl top-1/2 right-0 -translate-y-1/2 cursor-pointer outline-none rounded-lg"
                  onClick={() => {
                    if (showConfPass == "password") setShowConfPass("text");
                    else setShowConfPass("password");
                  }}
                >
                  {showConfPass == "password" ? (
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
              {errors.cnfpassword && (
                <small className="text-red-500">
                  {errors.cnfpassword.message}
                </small>
              )}
            </div>

            {/* ---------------Term Agreement-------------- */}
            <div>
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  {...register("iagreewithterms", {
                    required: {
                      value: true,
                      message: "Acceptance with terms is required!",
                    },
                  })}
                />
                <p>I agree to all terms</p>
              </div>
              {errors.iagreewithterms && (
                <small className="text-red-500">
                  {errors.iagreewithterms.message}
                </small>
              )}
            </div>

            {/* --------------- Register Button -------------- */}
            <div>
              <button
                type="submit"
                className="cursor-pointer px-7 py-3 bg-[#ff7777] hover:bg-[#fc8787] text-white font-semibold
                rounded"
              >
                Register
              </button>
            </div>
          </form>

          {/* --------------- Sign in Button -------------- */}
          <div>
            <p className="text-base flex gap-2 flex-wrap">
              <span>Already have an account?</span>
              <a
                href="/login"
                className="text-[#008bd9] font-semibold hover:underline underline-offset-2"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
        <div className="hidden md:block md:w-1/2">
          <img
            src={registerBG}
            alt="Login Backgroung Photo"
            className="h-full mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
