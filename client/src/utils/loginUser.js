import catchErrors from "./catchAsync";

const loginUser = catchErrors(async (user) => {
  const response = await fetch("/api/user/login", {
    method: "POST",
    credentials: "same-origin",
    redirect: "follow",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return await response.json();
});

export default loginUser;
