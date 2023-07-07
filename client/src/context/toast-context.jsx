import { createContext, useState } from "react";
import Toast from "../components/Toast";

const ToastContext = createContext({
  addToast: ({ message, type }) => {},
  handleResponse: (data = { status: "", message: "" }) => {},
});

export const ToastContextProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  /*
    Message: Content to be shown in the popup toast
    Type: Can be either of success, danger, info
    The color of the toast will be dependent on its type
  */
  const addToast = ({ message, type }) => {
    setToasts([...toasts, { message, type, id: toasts.length }]);
  };

  /*
    Automatically Handles the creation of the toast
     based on server responses
     addToast() can be used for a more fine grained control
  */
  const handleResponse = (data = {}) => {
    if (data.status === "success") {
      addToast({
        message: data.message || "Success",
        type: "success",
      });
    } else {
      addToast({
        message:
          data.message ||
          "An unexpected error occurred, please try again later",
        type: "danger",
      });
    }
  };

  return (
    <ToastContext.Provider
      value={{
        addToast: addToast,
        handleResponse: handleResponse,
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
