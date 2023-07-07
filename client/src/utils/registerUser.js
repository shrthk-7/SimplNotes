import catchErrors from "./catchAsync";

const register = catchErrors(async (body) => {
  const response = await fetch("/api/user/signup", {
    method: "POST",
    credentials: "same-origin",
    redirect: "follow",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
});

export default register;
