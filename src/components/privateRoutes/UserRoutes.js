import { Outlet, Navigate } from "react-router"
import { useAuth } from "../../contexts/AuthContext"
import Nav from "../../pages/website/components/nav/Nav"

const UserRotues = () => {
    const { user } = useAuth()
    return (
        user?.uid ? <Outlet /> : <Navigate to='/login' />
    )
}

export default UserRotues