import { Outlet, Navigate } from "react-router"
import { useAuth } from "../../contexts/AuthContext"

const AdminRoutes = () => {
    const { user } = useAuth()
    return (
        // (user?.uid === process.env.REACT_APP_DEV_ID || user?.uid === "NcHM2FUvdgNQ2BGhrIFCrl7oPTt1")
        true
         ? <Outlet /> : <Navigate to='/login' />

    )
}

export default AdminRoutes