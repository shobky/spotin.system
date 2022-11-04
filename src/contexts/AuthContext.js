import React, { useContext, useState, useEffect } from "react"
import { auth, db, signInWithGoogle } from "../firebase/Config"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, getRedirectResult } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import { useNavigate } from "react-router";
const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate()
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [wantedOrder, setWantedOrder] = useState('')

    const signup = (login) => {
        signInWithGoogle()
        getRedirectResult(auth)
            .then((res) => {
                const credential = GoogleAuthProvider.credentialFromResult(res);
                const token = credential.accessToken;
                setUser(res.user);
                setLoading(true)

                if (login || user?.commForm === "filled") {
                    navigate('/')
                }
                //
            })
            .catch((err) => {
                setError(err.message)
                // const credential = GoogleAuthProvider.credentialFromError(err)
                setLoading(true)

                //
                console.log(error, 'er')
            })
    }

    // const signup = async (email, password, name, url) => {
    //     await createUserWithEmailAndPassword(auth, email, password);
    //     const uid = uuidv4().slice(-5)
    //     await updateProfile(auth.currentUser, {
    //         displayName: name,
    //         photoURL: url
    //     })
    //     if (url?.length > 0) {
    //         setDoc(doc(db, "Users", email), {
    //             email: email,
    //             name: name,
    //             uid: uid,
    //             url: url,
    //             isSigned: true

    //         })
    //     } else {
    //         setDoc(doc(db, "Users", email), {
    //             email: email,
    //             name: name,
    //             uid: uid,
    //             isSigned: true

    //         })
    //     }
    // }

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
    // useEffect(() => {
    //     const addUser = async () => {
    //         if (user) {
    //             await setDoc(doc(db, "Users", user.email), {
    //                 email: user.email,
    //                 name: user.displayName,
    //                 uid: user.email[3] + user.uid[0] + user.uid[15] + user.uid[5] + user.uid[13],
    //                 url: user.photoURL,
    //                 isSigned: true
    //             })
    //         }
    //     }
    //     addUser()
    // }, [user])

    const onSetWantedOrder = (userid) => {
        setWantedOrder(userid)
    }

    const value = {
        signup,
        login,
        user,
        logout,
        onSetWantedOrder,
        wantedOrder
    }

    return (
        <AuthContext.Provider value={value}>
            {loading && children}
        </AuthContext.Provider>
    )
}