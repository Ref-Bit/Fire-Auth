import { createContext, useContext, useState, useEffect } from "react"
import { auth } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function signin(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function signout() {
    return auth.signOut();
  }

  const autoClose = 2000;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe;
  }, [])

  const value = { autoClose, currentUser, signup, signin, signout }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
