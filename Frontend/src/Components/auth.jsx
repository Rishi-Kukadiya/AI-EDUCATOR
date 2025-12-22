import { Navigate } from "react-router";
import axios from "axios";
import Loader from "./Loader";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const [valid, setValid] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("StudentData");
    const token = data ? JSON.parse(data).accessToken : null;
    console.log(token)
    if (!token) {
      setValid(false);
      return;
    }


    axios
      .get(
        `${import.meta.env.VITE_BACKEND_SERVER}/student/authenticate`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
        {
          withCredentials: true,
        }
      )
      .then(() => setValid(true))
      .catch(() => {
        localStorage.removeItem("accessToken");
        setValid(false);
      });
  }, []);

  if (valid === null) {
    return <Loader />; 
  }

  return valid ? children : <Navigate to="/login" replace />;
}
