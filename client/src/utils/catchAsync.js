/*
  wrapper function to catch errors during fetch calls
  Generates a default error data object incase of errors
*/

const catchErrors = (fn) => {
  return async (...params) => {
    try {
      return await fn(...params);
    } catch (error) {
      return {
        status: "error",
        message: error.message || "An unexpected error occurred",
      };
    }
  };
};

export default catchErrors;
