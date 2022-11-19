import { Outlet, Navigate } from "react-router"
import { useAuth } from "../../contexts/AuthContext"

const UserRotues = () => {
    const { user } = useAuth()
    return (
        user?.uid ? <Outlet /> : <Navigate to='/login' />
    )
}

export default UserRotues