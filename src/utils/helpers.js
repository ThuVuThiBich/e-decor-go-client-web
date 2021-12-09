export const getAuth = () => {
  const auth = localStorage.getItem("auth");
  return typeof auth === "string" ? JSON.parse(auth) : {};
};

export const setAuth = (auth) => {
  console.log("setAuth", auth);
  localStorage.setItem("auth", JSON.stringify(auth.result));
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (data) => {
  localStorage.setItem("token", data);
};
