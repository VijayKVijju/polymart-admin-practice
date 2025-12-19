
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
export const isAdminLoggedIn = () => {
  return !!localStorage.getItem("adminToken");
};

export const logoutAdmin = () => {
  localStorage.removeItem("adminToken");
};
