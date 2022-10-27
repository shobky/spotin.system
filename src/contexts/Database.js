import React, { useContext, useState } from "react"
import { db } from "../firebase/Config"
import { collection, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useAuth } from "./AuthContext";

const DataBaseContext = React.createContext()

export const useDb = () => {
    return useContext(DataBaseContext)
}

export const DataProvider = ({ children }) => {
    const { user } = useAuth()

    const productsQ = collection(db, `pos`)
    const [products] = useCollectionData(productsQ)

    const currentOrderq = collection(db, `current-order`)
    const [currentOrder] = useCollectionData(currentOrderq)

    const freshQ = collection(db, `fresh`)
    const [freshProducts] = useCollectionData(freshQ)

    const fillQ = collection(db, `fill`)
    const [fillProducts] = useCollectionData(fillQ)

    const openOrdersQ = collection(db, `open-orders`)
    const [openOrders,] = useCollectionData(openOrdersQ)

    const closedOrdersQ = collection(db, `closed-orders`)
    const [closedOrders] = useCollectionData(closedOrdersQ)

    const deletedOrdersQ = collection(db, `archived-orders`)
    const [deletedOrders] = useCollectionData(deletedOrdersQ)
    const orderId = (openOrders?.length + closedOrders?.length + deletedOrders?.length) + 1;


    const cartQ = collection(db, `cart#${orderId}-${(user?.uid ? user.uid.slice(-5) : "")}`)
    const [cart] = useCollectionData(cartQ)

    const usersQ = collection(db, `Users`)
    const [users] = useCollectionData(usersQ)

    const userordersQ = collection(db, `Users/${user.email}/orders`)
    const [userOrders] = useCollectionData(userordersQ)


    const upload = async (path, id, data) => {
        const docRef = doc(db, path, id);
        await setDoc(docRef, data)
    }
    const changeCartQty = async (cartItem, qty) => {
        if (user?.uid) {
            const docRef = doc(db, `cart#${orderId}-${(user?.uid).slice(-5)}/${cartItem.item.name}`);
            await updateDoc(docRef, {
                qty
            })
        }
    }
    const changeNewCartQty = async (id, cartItem, qty) => {
        if (user?.uid) {
            const path = `newcart#${id}-${(user?.uid).slice(-5)}/${cartItem.item.name}`
            const docRef = doc(db, path);
            await updateDoc(docRef, {
                qty
            })
        }
    }
    const updateNote = async (cartItem, note) => {
        if (user?.uid) {
            const docRef = doc(db, `cart#${orderId}-${(user?.uid).slice(-5)}/${cartItem.item.name}`);
            await updateDoc(docRef, {
                note
            })
        }
    }

    const remove = async (path) => {
        await deleteDoc(doc(db, path));

    }



    const value = {
        upload,
        currentOrder,
        products,
        freshProducts,
        fillProducts,
        openOrders,
        orderId,
        cart,
        updateNote,
        closedOrders,
        deletedOrders,
        changeCartQty,
        remove,
        users,
        changeNewCartQty,
        userOrders



    }

    return (
        <DataBaseContext.Provider value={value}>
            {children}
        </DataBaseContext.Provider>
    )
}
