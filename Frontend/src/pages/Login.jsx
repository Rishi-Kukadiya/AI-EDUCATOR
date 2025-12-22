import { useState } from "react";
import "../CSS/Login.css";
import Loginimg from "../assets/LoginTheme.jpg";
import { Link } from "react-router";
import Notification from "../Components/Notification";
import { useLocation } from "react-router";
import Loader from "../Components/Loader";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const data = location.state;

  useEffect(() => {
    if (data?.register) {
      setEmail(data?.email);
      setPassword(data?.password);
    }
  }, [data]);

  const [notification, setNotification] = useState({
    isOpen: false,
    type: "success",
    message: "",
  });

  const aiImage = Loginimg;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || email.trim() === "") {
      setNotification({
        isOpen: true,
        type: "error",
        message: "Email is required.",
      });
      return;
    }

    if (!password || password.trim() === "") {
      setNotification({
        isOpen: true,
        type: "error",
        message: "Password is required.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setNotification({
        isOpen: true,
        type: "error",
        message: "Invalid email format.",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_SERVER}/student/login`,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
          "Content-Type": "application/json",
        }
      );
      console.log(response);
      if (response?.data?.success) {
        localStorage.setItem("StudentData", JSON.stringify(response?.data));
        setNotification({
          isOpen: true,
          type: "success",
          message: response?.data?.message || "Login Successful!!",
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setNotification({
          isOpen: true,
          type: "error",
          message: "Internal Server Error!!",
        });
      }
    } catch (error) {
      const serverMessage = error.response?.data?.message;
      setNotification({
        isOpen: true,
        type: "error",
        message: serverMessage || "Interal Server Error!!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        {isLoading && <Loader />}
        <div className="brand-title">AI-EDUCATOR</div>

        <div className="heading">
          <h2>Welcome back</h2>
          <p>Please enter your details to sign in.</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="text"
              placeholder="student@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-btn">
            Sign in
          </button>
        </form>

        <Link to="/signup" style={{ textDecoration: "none" }}>
          <div className="signup-link">
            Don't have an account? <a href="#">Sign up for free</a>
          </div>
        </Link>
      </div>

      <div
        className="login-right"
        style={{ backgroundImage: `url(${aiImage})` }}
      ></div>
      <Notification
        isOpen={notification.isOpen}
        type={notification.type}
        message={notification.message}
        onClose={() => setNotification((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};

export default Login;
