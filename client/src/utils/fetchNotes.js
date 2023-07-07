import catchErrors from "./catchAsync";

const fetchNotes = catchErrors(async () => {
  const jwt_token = localStorage.getItem("token");

  if (!jwt_token) {
    throw new Error("User not signed in: No JWT Token found!");
  }

  const response = await fetch("/api/notes", {
    method: "GET",
    headers: {
      "x-access-token": jwt_token,
    },
  });

  return await response.json();
});

export default fetchNotes;
