import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../config/fbConfig';

const AuthContext = React.createContext();


export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password).then(()=> db.collection('users').doc(auth.currentUser.uid).set({
      email: auth.currentUser.email,
      coins: 10000
    })).catch(err => console.log(err.message));
  }

  

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout(){
      return auth.signOut()
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
