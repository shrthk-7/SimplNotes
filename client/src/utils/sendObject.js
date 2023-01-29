const sendObject = async (content) => {
  const response = await fetch("/api", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify({ content }),
  });
  return response.json();
};

export default sendObject;
