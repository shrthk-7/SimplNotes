import catchErrors from "./catchAsync";

const createNote = catchErrors(async ({ heading, body }) => {
  const jwt_token = localStorage.getItem("token");
  if (!jwt_token) {
    throw new Error("User not signed in");
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
  return await response.json();
});

export default createNote;
