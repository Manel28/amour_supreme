import { createContext, useContext, useEffect, useState } from "react";
//écoute en temps réel 
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase-config";
// stocker les infos liées à l’authentification.


const AuthContext = createContext();
// composant qui va englober toute ton app POUR FOUrnir ls infos d auth pour tt les children
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);//stocke l’utilisateur connecté ou null s’il n’y en a pas
  const [loading, setLoading] = useState(true);//utile pour éviter d'afficher du contenu avant d'avoir la réponse

//À chaque changement d’état  onAuthStateChanged est déclenché
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);//Il met à jour currentUser
      setLoading(false);//Une fois que Firebase a réponduon met loading à false
    });
    return () => unsubscribe();
  }, []);
//Petite fonction logout qui déclenche la déconnexion via Firebase
  const logout = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
