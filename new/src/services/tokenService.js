export const setToken = token => {
  localStorage.setItem("notezToken", token);
};

export const getToken = () => {
  return localStorage.getItem("notezToken");
};

export const removeToken = () => {
  localStorage.removeItem("notezToken");
};
