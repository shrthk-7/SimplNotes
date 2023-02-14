import { useState } from "react";
import register from "../../utils/registerUser";

import "./style.css";

const Signup = ({ login, hasAccount }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signUpHandler = async (event) => {
    event.preventDefault();
    const user = {
      username,
      password,
    };

    const data = await register(user);

    if (data.status === "success") {
      localStorage.setItem("token", data.token);
      login(data.token);
    } else {
      console.log(data);
    }

    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="signup-page">
      <h2 className="heading">Sign Up</h2>
      <form className="form-body" onSubmit={signUpHandler}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
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
        <div className="form-group">
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
      <div className="heading" onClick={hasAccount}>
        Already have an account?
      </div>
    </div>
  );
};

export default Signup;
