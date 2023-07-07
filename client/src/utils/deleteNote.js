import catchErrors from "./catchAsync";

const deleteNote = catchErrors(async (note) => {
  const jwt_token = localStorage.getItem("token");

  if (!jwt_token) {
    throw new Error("User not signed in : No JWT token found!");
  }

  const response = await fetch(`/api/notes/${note.id}`, {
    method: "DELETE",
    credentials: "same-origin",
    redirect: "follow",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": jwt_token,
    },
  });
  return await response.json();
});

export default deleteNote;
