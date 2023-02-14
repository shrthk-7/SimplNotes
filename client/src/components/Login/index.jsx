import React, { useState } from "react";
import loginUser from "../../utils/loginUser";
import "./style.css";

const Login = ({ login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (event) => {
    event.preventDefault();

    const user = {
      username,
      password,
    };

    const data = await loginUser(user);

    if (data.status === "success") {
      login(data.token);
    } else {
      console.log(data);
    }

    setUsername("");
    setPassword("");
  };

  return (
    <div className="signup-page">
      <h2 className="heading">Log In</h2>
      <form className="form-body" onSubmit={loginHandler}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
      <div className="heading">Don't have an account?</div>
    </div>
  );
};

export default Login;
