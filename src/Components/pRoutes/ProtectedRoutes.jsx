import { Children } from "react";
import { Navigate } from "react-router-dom";

export default function P_Route({ children }) {
  const auth = localStorage.getItem("auth") === "true";
  return auth ? children : <Navigate to="/login" />;
}
