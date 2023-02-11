import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({
  isLoggedin: false,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    const prevLoginInfo = localStorage.getItem("isLoggedin");
    console.log("here");
    console.log(prevLoginInfo);
    if (prevLoginInfo === true) {
      setIsLoggedin(true);
    }
  }, []);

  const loginHandler = () => {
    localStorage.setItem("isLoggedin", true);
    setIsLoggedin(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedin");
    setIsLoggedin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedin: isLoggedin,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
