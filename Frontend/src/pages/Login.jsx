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

          <div className="divider">
            <span>OR CONTINUE WITH</span>
          </div>

          <button type="button" className="google-btn">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 4.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.09 14.97 0 12 0 7.7 0 3.99 2.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
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
