import { Outlet, Navigate } from "react-router"
import { useAuth } from "../../contexts/AuthContext"

const AdminRoutes = () => {
    const { user } = useAuth()
    return (
        (user?.uid === process.env.REACT_APP_DEV_ID || user?.uid === "o0VdaeJxTdY6mbpISA2InhUKL6B3") ? <Outlet /> : <Navigate to='/login' />
    )
}

export default AdminRoutes