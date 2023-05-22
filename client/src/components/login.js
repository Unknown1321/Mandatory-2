import styles from "../styles/register.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { API_URL } from "../url";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

export const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { email, password } = credentials;
  const navigate = useNavigate();
  const WITH_CREDENTIALS = { withCredentials: true };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        {
          email: email,
          password: password,
        },
        WITH_CREDENTIALS
      );
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log("Error object:", error);
      if (error.response && error.response.data) {
        // Handle the error response
        toast.error(error.response.data.message);
      } else {
        // Handle the generic error
        toast.error("An error occurred.");
      }
    }
  };

  const handleInputChange = (event) => {
    setCredentials((previousCredentials) => ({
      ...previousCredentials,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="register-container">
      <ToastContainer
        autoClose={15000}
        closeOnClick={true}
        position={toast.POSITION.TOP_CENTER}
      />

      <form onSubmit={handleSubmit}  method="POST">
        <h2>Login</h2>
        <p>
          <input
            id="Email"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleInputChange}
            required
          />
        </p>
        <p>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange}
            required
          />
        </p>
        <button type="button" onClick={handleSubmit}>
          Log in
        </button>
      </form>

      <div className={styles.signUpButton}>
        <p>
          <Link to="/signup">Not registered yet? Sign up here!</Link>
        </p>
      </div>
    </div>
  );
};

export default Login