import React, { useContext, useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Notes from "./page-components/Notes";
import AuthContext from "./context/auth-context";

import "./App.css";

const App = () => {
  const [hasAccount, setHasAccount] = useState(false);
  const { isLoggedin, login } = useContext(AuthContext);

  let content = <></>;
  if (isLoggedin) {
    content = <Notes />;
  } else {
    if (hasAccount) {
      content = (
        <Login login={login} hasNoAccount={() => setHasAccount(false)} />
      );
    } else {
      content = <Signup login={login} hasAccount={() => setHasAccount(true)} />;
    }
  }
  return <>{content}</>;
};

export default App;
