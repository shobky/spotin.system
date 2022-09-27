import { Outlet, Navigate } from "react-router"
import { useAuth } from "../../contexts/AuthContext"

const OwnerRoutes = () => {
    const { user } = useAuth()
    return (
        user?.uid === process.env.REACT_APP_DEV_ID || user?.uid === "NcHM2FUvdgNQ2BGhrIFCrl7oPTt1"  ? <Outlet /> : <Navigate to='/login' />
    )
}

export default OwnerRoutes