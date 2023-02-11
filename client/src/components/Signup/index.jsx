import React, { useRef } from "react";
import "./style.css";

const Signup = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const createNewUser = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/user/signup", {
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

    usernameRef.current.value = "";
    passwordRef.current.value = "";
    passwordConfirmRef.current.value = "";

    console.log(data);
  };

  return (
    <div className="signup-page">
      <h2 className="heading">Sign Up</h2>
      <form className="form-body" onSubmit={createNewUser}>
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
        <div className="form-group">
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            type="passwordConfirm"
            name="passwordConfirm"
            id="passwordConfirm"
            ref={passwordConfirmRef}
          />
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
      <div className="heading">Already have an account?</div>
    </div>
  );
};

export default Signup;
