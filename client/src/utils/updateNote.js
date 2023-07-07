import catchErrors from "./catchAsync";

const updateNote = catchErrors(async (note) => {
  const jwt_token = localStorage.getItem("token");

  if (!jwt_token) {
    throw new Error("User not signed in: No JWT Token found!");
  }

  const response = await fetch(`/api/notes/${note.id}`, {
    method: "PATCH",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": jwt_token,
    },
    redirect: "follow",
    body: JSON.stringify({ ...note }),
  });
  return await response.json();
});

export default updateNote;
