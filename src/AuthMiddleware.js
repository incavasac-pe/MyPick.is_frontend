// AuthMiddleware.js
const checkAuth = () => {
    // Verificar si el usuario está autenticado según tu lógica de autenticación
    // Por ejemplo, puedes verificar la existencia de un token de autenticación en localStorage
    const isAuthenticated = localStorage.getItem('user') !== null;
  
    return isAuthenticated;
  };
  export { checkAuth };