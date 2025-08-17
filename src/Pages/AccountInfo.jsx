import React, { useEffect } from "react";
import card1 from "../assets/krishna1.jpg";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { updateUserInfo } from "../api/user/user-api";
import { setUser } from "../Redux/userSlice";

const AccountInfo = () => {
  let userData = useSelector((state) => state.user.data);
  let dispatch = useDispatch();
  let {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  let updateAccInfo = async (data) => {
    console.log(data);
    try {
      let updateAccResult = await updateUserInfo(userData._id, data);
      // console.log(updateAccResult);
      if (updateAccResult.success) {
        dispatch(setUser(updateAccResult.data));
        toast.success("User information updates successfully.");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status == 409) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    let fields = ["firstname", "lastname", "username", "useremail"];
    for (let fl of fields) {
      setValue(fl, userData[fl]);
    }
  }, [userData]);
  return (
    <div className="mx-10 xl:mx-18 h-full rounded-2xl p-5 border border-[#A1A3AB]">
      <div className="flex justify-between items-center">
        <p className="font-semibold flex flex-col">
          <span className="text-xl">Account Information</span>
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
          <p className="font-semibold text-lg">{userData.username}</p>
          <p className="text-sm">{userData.useremail}</p>
        </div>
      </div>

      <form
        className="border border-[#A1A3AB] p-7 rounded-lg"
        onSubmit={handleSubmit(updateAccInfo)}
      >
        <div className="flex flex-col mb-2">
          <label htmlFor="curpwd" className="font-semibold mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="py-1.5 px-3 outline-none max-w-[500px] border border-[#A1A3AB] rounded-sm"
            {...register("username")}
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="curpwd" className="font-semibold mb-1">
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            className="py-1.5 px-3 outline-none max-w-[500px] border border-[#A1A3AB] rounded-sm"
            {...register("firstname")}
          />
        </div>

        <div className="flex flex-col mb-2">
          <label htmlFor="curpwd" className="font-semibold mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            className="py-1.5 px-3 outline-none max-w-[500px] border border-[#A1A3AB] rounded-sm"
            {...register("lastname")}
          />
        </div>

        <div className="flex flex-col mb-2">
          <label htmlFor="curpwd" className="font-semibold mb-1">
            Email Address
          </label>
          <input
            type="text"
            id="useremail"
            className="py-1.5 px-3 outline-none max-w-[500px] border border-[#A1A3AB] rounded-sm"
            {...register("useremail")}
          />
        </div>

        {/* <div className="flex flex-col mb-2">
          <label htmlFor="curpwd" className="font-semibold mb-1">
            Contact Number
          </label>
          <input
            type="text"
            id="usrmobile"
            className="py-1.5 px-3 outline-none max-w-[500px] border border-[#A1A3AB] rounded-sm"
          />
        </div>

        <div className="flex flex-col mb-7">
          <label htmlFor="curpwd" className="font-semibold mb-1">
            Position
          </label>
          <input
            type="text"
            id="userposition"
            className="py-1.5 px-3 outline-none max-w-[500px] border border-[#A1A3AB] rounded-sm"
          />
        </div> */}

        <div className="flex gap-3 mt-10">
          <button
            type="submit"
            className="py-1.5 px-5 bg-[#f24e1e] hover:bg-[#fc440c] text-white rounded-sm cursor-pointer"
          >
            Save
          </button>
          <button
            type="reset"
            className="py-1.5 px-5 bg-[#f24e1e] hover:bg-[#fc440c] text-white rounded-sm cursor-pointer"
            onClick={() => reset()}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountInfo;
