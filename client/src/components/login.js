import styles from "../styles/login.css";
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
        API_URL + "/login",
        {
          email: email,
          password: password,
        },
        WITH_CREDENTIALS
      );
      if (response.status === 200) {
        navigate("/homepage");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleInputChange = (event) => {
    setCredentials((previousCredentials) => ({
      ...previousCredentials,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="">
      <ToastContainer
        autoClose={15000}
        closeOnClick={true}
        position={toast.POSITION.TOP_CENTER}
      />

      <form onSubmit={handleSubmit} className={styles.container} method="POST">
        <h1>Login</h1>
        <p>
          <input
            id="Email"
            type="text"
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
        <input type="submit" id={styles.submit} value="Sign in" />
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