const updateNote = async (note) => {
  const jwt_token = localStorage.getItem("token");

  if (!jwt_token) {
    return Promise.reject("User not signed in");
  }

  const response = await fetch(`/api/notes/${note._id}`, {
    method: "PATCH",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": jwt_token,
    },
    redirect: "follow",
    body: JSON.stringify({ ...note }),
  });
  return response.json();
};

export default updateNote;
