const sendObject = async (content) => {
  const jwt_token = localStorage.getItem("token");

  if (!jwt_token) {
    return Promise.reject("User not signed in");
  }

  const response = await fetch("/api", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": jwt_token,
    },
    redirect: "follow",
    body: JSON.stringify({ content }),
  });
  return response.json();
};

export default sendObject;
