const deleteNote = async (note) => {
  const jwt_token = localStorage.getItem("token");

  if (!jwt_token) {
    return Promise.reject("User not signed in");
  }

  const response = await fetch(`/api/notes/${note.note_id}`, {
    method: "DELETE",
    credentials: "same-origin",
    redirect: "follow",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": jwt_token,
    },
  });
  return response.json();
};

export default deleteNote;
