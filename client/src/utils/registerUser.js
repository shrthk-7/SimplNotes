const register = async (body) => {
  const response = await fetch("/api/user/signup", {
    method: "POST",
    credentials: "same-origin",
    redirect: "follow",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return response.json();
};

export default register;
