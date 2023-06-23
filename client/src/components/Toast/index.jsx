import { useState, useEffect } from "react";
import "./style.css";

const colorTable = {
  success: {
    backgroundColor: "var(--teal-700-accent)",
    color: "black",
    borderColor: "black",
  },
  danger: {
    backgroundColor: "var(--amber-900)",
    color: "var(--brown-800)",
    borderColor: "var(--brown-800)",
  },
  info: {
    backgroundColor: "var(--lime-300)",
    color: "var(--brown-800)",
    borderColor: "var(--brown-800)",
  },
};

const Toast = ({ message, onDelete, delay, type }) => {
  if (type !== "info" && type !== "danger" && type !== "success") {
    type = "success";
  }
  if (typeof delay !== "number" || delay < 100 || delay > 10000) {
    delay = 5000;
  }
  if (typeof onDelete !== "function") {
    onDelete = () => {};
  }

  const [slidingOut, setSlidingOut] = useState(false);

  useEffect(() => {
    /*
      Queues a callback that'll change 
      the state `slidingOut` to true 0.4s before the toast
      is scheduled to be removed

      And will remove the toast after the 
      sliding out animation has finished
    */
    const timerId = setTimeout(() => {
      setSlidingOut(true);
      setTimeout(() => onDelete(), 400);
    }, delay - 400);

    return () => clearTimeout(timerId);
  }, []);

  return (
    <div
      className={`toast ${slidingOut ? "slidingOut" : "slidingIn"}`}
      style={colorTable[type]}
    >
      {message}
    </div>
  );
};

export default Toast;
