const deleteNote = async (id) => {
  const response = await fetch("/api", {
    method: "DELETE",
    credentials: "same-origin",
    redirect: "follow",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  });
  return response.json();
};

export default deleteNote;
