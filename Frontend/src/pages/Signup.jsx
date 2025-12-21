import { useState } from "react";
import "../CSS/Signup.css";
import Loginimg from "../assets/LoginTheme.jpg";
import { Link } from "react-router";
import Notification from "../Components/Notification";
import axios from "axios";
import { useNavigate } from "react-router";
import Loader from "../Components/Loader";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    school: "",
    std: "6",
    board: "GSEB",
    gender: "Male",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    isOpen: false,
    type: "success",
    message: "",
  });

  const aiImage = Loginimg;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || formData.fullName.trim() === "") {
      setNotification({
        isOpen: true,
        type: "error",
        message: "Full Name is required.",
      });
      return;
    }

    if (!formData.email || formData.email.trim() === "") {
      setNotification({
        isOpen: true,
        type: "error",
        message: "Email is required.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setNotification({
        isOpen: true,
        type: "error",
        message: "Invalid email format.",
      });
      return;
    }

    const phoneRegex = /^(?:\+91|91|0)?[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      setNotification({
        isOpen: true,
        type: "error",
        message: "Invalid Phone Number.",
      });
      return;
    }

    if (!formData.city || formData.city.trim() === "") {
      setNotification({
        isOpen: true,
        type: "error",
        message: "City is required.",
      });
      return;
    }

    const gujaratCities = [
      "Ahmedabad",
      "Surat",
      "Vadodara",
      "Rajkot",
      "Bhavnagar",
      "Jamnagar",
      "Junagadh",
      "Gandhinagar",
      "Anand",
      "Nadiad",
      "Bharuch",
      "Patan",
      "Mehsana",
      "Navsari",
      "Vapi",
      "Valsad",
      "Morbi",
      "Porbandar",
      "Surendranagar",
      "Amreli",
      "Botad",
      "Dahod",
      "Palanpur",
      "Chhota Udaipur",
      "Godhra",
      "Mahisagar",
      "Dwarka",
      "Kutch",
      "Bhuj",
      "Gandhidham",
      "Veraval",
      "Una",
      "Somnath",
      "Modasa",
      "Himmatnagar",
      "Deesa",
      "Kheda",
      "Dang",
      "Mandvi",
      "Saputara",
      "Silvassa",
      "Daman",
      "Diu",
    ];

    const formatted = formData.city.trim().toLowerCase();
    const exists = gujaratCities.some((c) => c.toLowerCase() === formatted);
    if (!exists) {
      setNotification({
        isOpen: true,
        type: "error",
        message: "City must be in Gujarat.",
      });
      return;
    }

    if (!formData.school || formData.school.trim() === "") {
      formData.school = "dummy ";
    }

    if (!formData.password || formData.password.length < 6) {
      setNotification({
        isOpen: true,
        type: "error",
        message: "Make strong password!!",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_SERVER}/student/register`,
        formData,
        {
          "Content-Type": "application/json",
        }
      );
      console.log(response);
      if (response?.data?.success) {
        localStorage.setItem("StudentData", JSON.stringify(response?.data));
        setNotification({
          isOpen: true,
          type: "success",
          message: response?.data?.message || "Registration Successful!!"
        });

        setTimeout(() => {
          navigate("/login", {
            state: {
              register : true ,
              email: formData.email,
              password: formData.password,
            },
          });
        }, 2000);
      } else {
        setNotification({
          isOpen: true,
          type: "error",
          message: response?.data?.message || "Registration Failed!!",
        });
      }
    } catch (error) {
         const serverMessage = error.response?.data?.message;  
      setNotification({
        isOpen: true,
        type: "error",
        message: serverMessage ||"Internal Server Error!!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        {isLoading && <Loader />}
        <div className="form-wrapper">
          <div className="brand-title">AI-EDUCATOR</div>

          <div className="heading">
            <h2>Create Account</h2>
            <p>Join us to start your AI learning journey.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <input
                type="text"
                name="email"
                placeholder="student@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-grid">
              <div className="input-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  placeholder="Ahmedabad"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-group">
              <label>School Name</label>
              <input
                type="text"
                name="school"
                placeholder="St. Xavier's High School"
                value={formData.school}
                onChange={handleChange}
              />
            </div>

            <div className="form-grid">
              <div className="input-group">
                <label>Standard</label>
                <select name="std" value={formData.std} onChange={handleChange}>
                  <option value="6">6th</option>
                  <option value="7">7th</option>
                  <option value="8">8th</option>
                </select>
              </div>

              <div className="input-group">
                <label>Board</label>
                <select
                  name="board"
                  value={formData.board}
                  onChange={handleChange}
                >
                  <option value="GSEB">GSEB</option>
                  <option value="CBSE">CBSE</option>
                  <option value="ICSE">ICSE</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="input-group" style={{ marginTop: "15px" }}>
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="signup-btn">
              Register Student
            </button>
          </form>

          <Link to="/login" style={{ textDecoration: "none" }}>
            <div className="login-redirect">
              Already have an account? <a href="/login">Log In</a>
            </div>
          </Link>
        </div>
      </div>

      <div
        className="signup-right"
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

export default Signup;
