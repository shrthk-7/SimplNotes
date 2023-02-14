import React, { useContext } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Notes from "./page-components/Notes";
import AuthContext from "./context/auth-context";

import "./App.css";

const App = () => {
  const authCxt = useContext(AuthContext);
  return (
    <>{authCxt.isLoggedin ? <Notes /> : <Login login={authCxt.login} />}</>
  );
};

export default App;
