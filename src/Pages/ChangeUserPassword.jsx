import React, { useEffect, useState } from "react";
import card1 from "../assets/krishna1.jpg";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
// import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { changePassword } from "../api/user/user-api";
import { toast } from "react-toastify";

const ChangeUserPassword = () => {
  let userData = useSelector((state) => state.user.data);
  let [showCurrPass, setShowCurrPass] = useState(false);
  let [showNewPass, setShowNewPass] = useState(false);
  let [showConfNewPass, setShowConfNewPass] = useState(false);

  let {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  let changePassSubmit = async (data) => {
    try {
      let changePassResult = await changePassword(data);
      // console.log(changePassResult);
      if (changePassResult.success) {
        reset();
        toast.success(changePassResult.message);
      } else {
        toast.error(changePassResult.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="mx-10 xl:mx-18 h-full rounded-2xl p-5 border border-[#A1A3AB]">
      <div className="flex justify-between items-center">
        <p className="font-semibold flex flex-col">
          <span className="text-xl">Change Password</span>
          <span className="w-20 border-1 border-[#f24e1e]"></span>
        </p>
        <NavLink
          to="/settings"
          className="font-semibold text-sm underline underline-offset-2 cursor-pointer"
        >
          Go Back
        </NavLink>
      </div>

      <div className="flex items-center gap-3 my-7">
        <img
          src={card1}
          alt="User Photo"
          className="w-[70px] h-[70px] rounded-full"
        />
        <div>
          <p className="font-semibold text-lg">Username</p>
          <p className="text-sm">user email id</p>
        </div>
      </div>

      <form
        className="border border-[#A1A3AB] p-7 rounded-lg"
        onSubmit={handleSubmit(changePassSubmit)}
      >
        <div className="flex flex-col mb-2">
          <label htmlFor="curpwd" className="font-semibold mb-1">
            Current Password
          </label>
          <div className="w-[500px]">
            <div className="relative">
              <input
                type={showCurrPass ? "text" : "password"}
                id="curpwd"
                className="py-1.5 px-3 outline-none w-full border border-[#A1A3AB] rounded-sm"
                {...register("password", {
                  required: {
                    value: true,
                    message: "current password is required.",
                  },
                })}
              />
              <button
                type="button"
                className="absolute top-1/2 -translate-y-1/2 right-3 text-2xl"
                onClick={() => setShowCurrPass(!showCurrPass)}
              >
                {showCurrPass ? <IoIosEyeOff /> : <IoIosEye />}
              </button>
            </div>

            {errors.password && (
              <small className="text-red-500">{errors.password.message}</small>
            )}
          </div>
        </div>

        <div className="flex flex-col mb-2">
          <label htmlFor="newpwd" className="font-semibold mb-1">
            New Password
          </label>
          <div className="w-[500px]">
            <div className="relative">
              <input
                type={showNewPass ? "text" : "password"}
                id="newpwd"
                className="w-full py-1.5 px-3 outline-none border border-[#A1A3AB] rounded-sm"
                {...register("newPassword", {
                  required: {
                    value: true,
                    message: "new password is required.",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#%^&*()\[\]_+\-=?<>])[A-Za-z\d~!@#%^&*()\[\]_+\-=?<>]{6,}$/,
                    message:
                      "password must have 1 aphabet, 1 capital aphabet, 1 number, 1 special character and 6 characters at least",
                  },
                })}
              />
              <button
                type="button"
                className="absolute top-1/2 -translate-y-1/2 right-3 text-2xl"
                onClick={() => setShowNewPass(!showNewPass)}
              >
                {showNewPass ? <IoIosEyeOff /> : <IoIosEye />}
              </button>
            </div>

            {errors.newPassword && (
              <small className="text-red-500">
                {errors.newPassword.message}
              </small>
            )}
          </div>
        </div>

        <div className="flex flex-col mb-7">
          <label htmlFor="confpwd" className="font-semibold mb-1">
            Confirm Password
          </label>
          <div className="w-[500px]">
            <div className="relative">
              <input
                type={showConfNewPass ? "text" : "password"}
                id="confpwd"
                className="w-full py-1.5 px-3 outline-none max-w-[500px] border border-[#A1A3AB] rounded-sm"
                {...register("confNewPassword", {
                  required: {
                    value: true,
                    message: "confirm password is required.",
                  },
                  validate: {
                    sameAsPassword: (value) => {
                      return (
                        value === getValues("newPassword") ||
                        "password do not match"
                      );
                    },
                  },
                })}
              />
              <button
                type="button"
                className="absolute top-1/2 -translate-y-1/2 right-3 text-2xl"
                onClick={() => setShowConfNewPass(!showConfNewPass)}
              >
                {showConfNewPass ? <IoIosEyeOff /> : <IoIosEye />}
              </button>
            </div>
            {errors.confNewPassword && (
              <small className="text-red-500">
                {errors.confNewPassword.message}
              </small>
            )}
          </div>
        </div>

        <div className="flex gap-3 mb-24">
          <button
            type="submit"
            className="py-1.5 px-5 bg-[#f24e1e] text-white rounded-sm cursor-pointer"
          >
            Update Password
          </button>
          <button
            type="reset"
            className="py-1.5 px-5 bg-[#f24e1e] text-white rounded-sm cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangeUserPassword;
