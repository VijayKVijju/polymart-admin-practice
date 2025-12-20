
//=====first
/*
export const isAdminLoggedIn = () => {
  return !!localStorage.getItem("adminToken");
};

export const logoutAdmin = () => {
  localStorage.removeItem("adminToken");
  window.location.href = "/admin/login";
};
*/

//second=============
// utils/auth.js

export const isAdminLoggedIn = () => {
  return !!localStorage.getItem("adminToken");
};

export const loginAdmin = (token) => {
  localStorage.setItem("adminToken", token);
};

export const logoutAdmin = () => {
  localStorage.removeItem("adminToken");
  window.location.href = "/admin/login";
};