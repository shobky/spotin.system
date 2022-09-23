import { Outlet, Navigate } from "react-router"
import { useAuth } from "../../contexts/AuthContext"

const OwnerRoutes = () => {
    const { user } = useAuth()
    return (
        user?.uid === process.env.REACT_APP_OWNER_ID ? <Outlet /> : <Navigate to='/login' />
    )
}

export default OwnerRoutes