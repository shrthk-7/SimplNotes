import { createContext, useState } from "react";
import Toast from "../components/Toast";

const ToastContext = createContext({
  addToast: (message = "") => {},
});

export const ToastContextProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const addToast = ({ message, type }) => {
    setToasts([...toasts, { message, type, id: toasts.length }]);
  };

  return (
    <ToastContext.Provider
      value={{
        addToast: addToast,
      }}
    >
      <div
        className="toasts"
        style={{
          position: "fixed",
          right: "0",
          gap: "1rem",
          display: "flex",
          flexDirection: "column",
          width: "min(90%, 20rem)",
          margin: "1rem min(5%, 1rem)",
          zIndex: "100",
        }}
      >
        {toasts.map(({ message, type, id }) => (
          <Toast
            message={message}
            onDelete={() => {
              setToasts((prevToasts) =>
                prevToasts.filter((toast) => toast.id !== id)
              );
            }}
            type={type}
            key={id}
          />
        ))}
      </div>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContext;
