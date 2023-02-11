import React, { useState } from "react";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Notes from "./page-components/Notes";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return <>{loggedIn ? <Notes /> : <Login setLoggedIn={setLoggedIn} />}</>;
};

export default App;
