// utils/isLogin.js
export const isLogin = () => {
    // Here you can add your logic to check if the user is logged in
    // For simplicity, we will use localStorage to store the login status
    return localStorage.getItem('isLoggedIn') === 'true';
  };
  
  export const login = () => {
    localStorage.setItem('isLoggedIn', 'true');
  };
  
  export const logout = () => {
    localStorage.removeItem('isLoggedIn');
  };
  