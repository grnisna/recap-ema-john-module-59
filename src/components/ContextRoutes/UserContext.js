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

    const createUser = (email, password) =>{
       return createUserWithEmailAndPassword(auth,email,password)
    }

    const loggedInUser = (email,password)=>{
        return signInWithEmailAndPassword(auth,email,password);
    }

    const resetPassword = (email) =>{
        return sendPasswordResetEmail(auth, email);
    }

    const loggedOut = () =>{
        return signOut(auth);
    }

    useEffect( ()=>{
      const unsubcribe =  onAuthStateChanged(auth, currentUser =>{
            console.log(currentUser);
            setUser(currentUser);
        });

        return () => {
            unsubcribe();
        }

    } ,[])
    
    const authInfo = {user, createUser , loggedInUser, resetPassword,loggedOut};

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;