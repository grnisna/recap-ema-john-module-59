import React from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut}  from 'firebase/auth';
import app from '../../firebase/firebase.init';
import { useEffect } from 'react';


export const AuthContext = createContext();
const auth = getAuth(app);

const UserContext = ({children}) => {
    const [user, setUser ]  = useState({});
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) =>{
        setLoading(true);
       return createUserWithEmailAndPassword(auth,email,password)
    }

    const loggedInUser = (email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    const resetPassword = (email) =>{
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    }

    const loggedOut = () =>{
        setLoading(true);
        return signOut(auth);
    }

    useEffect( ()=>{
      const unsubcribe =  onAuthStateChanged(auth, currentUser =>{
            console.log(currentUser);
            setUser(currentUser);
            setLoading(false);
        });

        return () => {
            unsubcribe();
        }

    } ,[])
    
    const authInfo = {user, loading, createUser , loggedInUser, resetPassword,loggedOut};

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;