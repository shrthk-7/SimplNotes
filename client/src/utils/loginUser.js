const loginUser = async (user) => {
  const response = await fetch("/api/user/login", {
    method: "POST",
    credentials: "same-origin",
    redirect: "follow",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

export default loginUser;
