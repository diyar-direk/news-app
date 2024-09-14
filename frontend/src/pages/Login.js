import React, { useContext, useState } from "react";
import "./login.css";
import axios from "axios";
import { Context } from "../context/Context";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import FormLoading from "../components/FormLoading";
const Login = () => {
  const context = useContext(Context);
  const language = context.langValue.registration;
  const [wrongData, setWrongData] = useState("");
  const cookie = new Cookies();
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setWrongData(false);
  };

  const loginSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const data = await axios.post("http://localhost:8000/api/news/login", {
        username: form.username,
        password: form.password,
      });
      setLoading(false);
      cookie.set("Bearer", data.data.token);
      context.setUserDetails({
        token: data.data.token,
        user: data.data.userRole,
        isAdmin: data.data.userRole.includes("admin"),
      });
      nav("/dashboard");
    } catch (err) {
      setLoading(false);
      console.log(err);
      const errMessage = err.response.data.message;
      if (errMessage === "Invalid email or password") setWrongData(true);
    }
  };

  function showPassword(e) {
    e.target.classList.toggle("fa-eye-slash");
    e.target.classList.toggle("fa-eye");
    const input = document.querySelector(".password");
    input.type === "password"
      ? (input.type = "text")
      : (input.type = "password");
  }
  return (
    <main className="center section-color">
      <form onSubmit={loginSubmit} className="wrapper register">
        {loading && <FormLoading />}
        <h2> {language && language.pageName} </h2>
        <div className="input-box">
          <span className="icon">
            <i className="bx bx-user"></i>
          </span>
          <input
            value={form.username}
            onChange={handleChange}
            name="username"
            type="text"
            required
          />
          <label> {language && language.username} </label>
        </div>
        <div className="input-box">
          <span className="icon">
            <i onClick={showPassword} className="fa-regular show fa-eye"></i>
          </span>
          <input
            onChange={handleChange}
            name="password"
            className="password"
            type="password"
            required
            value={form.password}
          />
          <label> {language && language.password} </label>
        </div>
        {wrongData && <p className="error">{language.wrongData}</p>}
        <button type="submit" className="btn">
          {language && language.btn}
        </button>
      </form>

      <script src="script.js"></script>
      <script
        type="module"
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
      ></script>
      <script
        noModule
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
      ></script>
    </main>
  );
};

export default Login;
