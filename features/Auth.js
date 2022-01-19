import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (!user) return;
      const token = await user.getIdToken();
      const docRef = doc(db, "users", user.uid);
      const payload = {
        username: user.displayName,
        email: user.email,
        lastSeen: serverTimestamp(),
        avatar: user.photoURL,
      };
      await setDoc(docRef, payload);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user } }>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
