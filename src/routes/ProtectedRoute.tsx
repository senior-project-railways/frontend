import React from "react";
import { Navigate, Route, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Profile from "../pages/pages/profile"

const ProtectedRoute = (props: RouteProps) => {
  const auth = useSelector((state: RootState) => state.auth);
  if (auth.account) {
    // if (props.path === "/login") {
    //   return <Navigate to={"/"} />;
    // }
    // return <Route {...props} />;
    return <Profile/>;
  } else {
    return <Navigate to={"/404"} />;
  }
};

export default ProtectedRoute;