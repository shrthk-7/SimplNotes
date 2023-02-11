import React, { useRef } from "react";
import "./style.css";

const Login = ({ setLoggedIn }) => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const loginUser = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/user/login", {
      method: "POST",
      credentials: "same-origin",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      }),
    });
    const data = await response.json();
    if (data.status === "success") {
      setLoggedIn(true);
    }
    usernameRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <div className="signup-page">
      <h2 className="heading">Log In</h2>
      <form className="form-body" onSubmit={loginUser}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" ref={usernameRef} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            ref={passwordRef}
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
