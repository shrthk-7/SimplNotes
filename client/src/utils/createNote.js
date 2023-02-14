const createNote = async ({ heading, body }) => {
  const jwt_token = localStorage.getItem("token");
  if (!jwt_token) {
    return Promise.reject("User not signed in");
  }

  const response = await fetch("/api/notes", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": jwt_token,
    },
    redirect: "follow",
    body: JSON.stringify({ heading, body }),
  });
  return response.json();
};

export default createNote;
