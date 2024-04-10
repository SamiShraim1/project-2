/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
export default function ProtectedRouuter({children}) {
    const token = localStorage.getItem('userToken');
    if (!token) {
        return <Navigate to ='/login' replace />
    }
  return children;
}
