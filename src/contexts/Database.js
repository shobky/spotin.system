import React, { useContext } from "react"
import { auth, db } from "../firebase/Config"
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
    const [products, productsLoading] = useCollectionData(productsQ)

    const currentOrderq = collection(db, `current-order`)
    const [currentOrder, currentOrderLoading] = useCollectionData(currentOrderq)

    const freshQ = collection(db, `fresh`)
    const [freshProducts, freshProductsLoading] = useCollectionData(freshQ)

    const fillQ = collection(db, `fresh`)
    const [fillProducts, fillProductsLoading] = useCollectionData(fillQ)

    const openOrdersQ = collection(db, `open-orders`)
    const [openOrders, openOrdersLoading] = useCollectionData(openOrdersQ)

    const closedOrdersQ = collection(db, `closed-orders`)
    const [closedOrders, closedOrdersLoading] = useCollectionData(closedOrdersQ)
    const orderId = (openOrders?.length + closedOrders?.length) + 1;

    const deletedOrdersQ = collection(db, `archived-orders`)
    const [deletedOrders, deletedOrdersLoading] = useCollectionData(deletedOrdersQ)

    const cartQ = collection(db, `cart#${orderId}-${(user?.uid).slice(-5)}`)
    const [cart, cartLoading] = useCollectionData(cartQ)

    const usersQ = collection(db, `Users`)
    const [users, usersLoading] = useCollectionData(usersQ)

    const upload = async (path, id, data) => {
        const docRef = doc(db, path, id);
        await setDoc(docRef, data)
    }
    const changeCartQty = async (cartItem, qty) => {
        const docRef = doc(db, `cart#${orderId}-${(user?.uid).slice(-5)}/${cartItem.item.name}`);
        await updateDoc(docRef, {
            qty
        })
    }
    const updateNote = async (cartItem, note) => {
        const docRef = doc(db, `cart#${orderId}-${(user?.uid).slice(-5)}/${cartItem.item.name}`);
        await updateDoc(docRef, {
            note
        })
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


    }

    return (
        <DataBaseContext.Provider value={value}>
            {children}
        </DataBaseContext.Provider>
    )
}
