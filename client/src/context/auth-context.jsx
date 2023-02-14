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

    if (prevLoginInfo == true) {
      setIsLoggedin(true);
    }
  }, []);

  const loginHandler = (token) => {
    localStorage.setItem("isLoggedin", true);
    localStorage.setItem("token", token);
    setIsLoggedin(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedin");
    localStorage.removeItem("token");
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
