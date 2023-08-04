import { Outlet, Navigate } from "react-router"
import { useAuth } from "../../contexts/AuthContext"

const AdminRoutes = () => {
    const { user } = useAuth()
    return (
        // (user?.uid === process.env.REACT_APP_DEV_ID || user?.uid === process.env.REACT_APP_OWNER_ID)
        true ? <Outlet /> : <Navigate to='/login' />
        //d

    )
}

export default AdminRoutes