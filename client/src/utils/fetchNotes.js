const fetchNotes = async () => {
  const jwt_token = localStorage.getItem("token");

  if (!jwt_token) {
    return Promise.reject("User not signed in");
  }

  const response = await fetch("/api/notes", {
    method: "GET",
    headers: {
      "x-access-token": jwt_token,
    },
  });

  return response.json();
};

export default fetchNotes;
