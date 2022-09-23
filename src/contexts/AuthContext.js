import React, { useContext, useState, useEffect } from "react"
import { auth, db } from "../firebase/Config"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState()
    const [loading, setLoading] = useState(false)

    const signup = async (email, password, name) => {
        await createUserWithEmailAndPassword(auth, email, password);
        return updateProfile(auth.currentUser, {
            displayName: name
        })
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user)
            setLoading(true)
        })
        return unsubscribe
    }, [])

    // adding use data in the firestore database
    useEffect(() => {
        const addUser = async () => {
            if (user) {
                await setDoc(doc(db, "Users", user.displayName), {
                    email: user.email,
                    name: user.displayName,
                    uid: user.email[3] + user.uid[0] + user.uid[15] + user.uid[5] + user.uid[13],
                })
            }
        }
        addUser()
    }, [user])

    const value = {
        signup,
        login,
        user,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {loading && children}
        </AuthContext.Provider>
    )
}