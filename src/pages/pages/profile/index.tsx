import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authSlice from "../../../store/slices/auth";
import {RootState} from "../../../store";
import useSWR from 'swr';
import {fetcher} from "../../../utils/axios";
import {AccountResponse} from "../../../types";

interface LocationState {
    userId: string;
}

const Profile = () => {
    const account = useSelector((state: RootState) => state.auth.account);
    const dispatch = useDispatch();
  
    const userId = account?.id
  
    const user = useSWR(`http://127.0.0.1:8000/api/user/${userId}/`, fetcher)
    console.log(user)
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(authSlice.actions.setLogout());
        navigate("/login");
    };
  return (
    <div className="w-full h-screen">
      <div className="w-full p-6">
        <button
          onClick={handleLogout}
          className="rounded p-2 w-32 bg-red-700 text-white"
        >
          Logout
        </button>
      </div>
      {
            user.data ?
                <div className="w-full h-full text-center items-center">
                    <p className="self-center my-auto">Welcome, {user.data?.full_name}</p>
                </div>
                :
                <p className="text-center items-center">Loading ...</p>
        }
        {/* <p className="self-center my-auto">Welcome, {user.data?.user.full_name}</p> */}
    </div>
  );
};

export default Profile;