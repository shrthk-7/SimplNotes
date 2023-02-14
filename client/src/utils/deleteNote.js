const deleteNote = async (id) => {
  const jwt_token = localStorage.getItem("token");

  if (!jwt_token) {
    return Promise.reject("User not signed in");
  }

  const response = await fetch("/api", {
    method: "DELETE",
    credentials: "same-origin",
    redirect: "follow",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": jwt_token,
    },
    body: JSON.stringify({ id: id }),
  });
  return response.json();
};

export default deleteNote;
