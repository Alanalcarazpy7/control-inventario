import { Navigate, Outlet } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
export const ProtectedRoute = ({ children,accesBy }) => {
  //Si el usuario no está autenticado, redirige a la página de inicio de sesión

  const { user } = UserAuth();
  if (accesBy === "non-authenticated") {
    if (!user) {
      return children;
    } else {
      return <Navigate to="/" />;
    }
    //Si el usuario está autenticado, muestra los hijos es decir las demas paginas
  } else if (accesBy === "authenticated") {
    if (user) {
      return children;
      }
  }
  
  return <Navigate to="/login" />;
};