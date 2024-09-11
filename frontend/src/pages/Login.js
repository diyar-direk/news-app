import React, { useContext, useState } from "react";
import "./login.css";
import axios from "axios";
import { Context } from "../context/Context";
const Login = () => {
  const context = useContext(Context);
  const language = context.langValue.registration;

  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loginSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(form);
      const data = await axios.post("http://localhost:8000/api/news/login", {
        username: form.username,
        password: form.password,
      });
      console.log(data.data.token);
    } catch (err) {
      console.log(err.message);
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
        <div className="remember-forgot">
          <label className="center">
            <input type="checkbox" />
            {language && language.rememberMe}
          </label>
        </div>
        <a href="login.html">
          <button type="submit" className="btn">
            {language && language.btn}
          </button>
        </a>
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
