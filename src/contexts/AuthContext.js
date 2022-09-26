import React, { useContext, useState, useEffect } from "react"
import { auth, db } from "../firebase/Config"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState()
    const [loading, setLoading] = useState(false)

    const signup = async (email, password, name, url) => {
        await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: url
        })
        if (url?.length > 0) {
            setDoc(doc(db, "Users", name), {
                email: email,
                name: name,
                uid: uuidv4().slice(-5),
                url: url
            })
        } else {
            setDoc(doc(db, "Users", name), {
                email: email,
                name: name,
                uid: uuidv4().slice(-5),
            })
        }
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
                    url: user.photoURL
                })
            }
        }
        addUser()
    }, [user])


    const value = {
        signup,
        login,
        user,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {loading && children}
        </AuthContext.Provider>
    )
}