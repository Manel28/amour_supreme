import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
// Ce composant PrivateRoute reçoit un children en props
// C ce qu'on veut afficher SEULEMENT si l'utilisateur est authentifié.

const PrivateRoute = ({ children }) => {
  // On recupere currentUser depuis le contexte d'authentification
  // Si currentUser est null donc  personne n'est connecté.
  const { currentUser } = useAuth();
  // Si aucun utilisateur n’est connecté on redirige vers la page de login
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  // sinon on affiche les enfants ( la page admin)
  return children;
};

export default PrivateRoute;
