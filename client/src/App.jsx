import React, { useContext } from "react";
// import Signup from "./components/Signup";
import Login from "./components/Login";
import Notes from "./page-components/Notes";
import AuthContext from "./context/auth-context";

import "./App.css";

const App = () => {
  const { isLoggedin, login } = useContext(AuthContext);
  return <>{isLoggedin ? <Notes /> : <Login login={login} />}</>;
};

export default App;
