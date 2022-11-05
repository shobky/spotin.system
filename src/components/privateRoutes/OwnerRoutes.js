import { Outlet, Navigate } from "react-router"
import { useAuth } from "../../contexts/AuthContext"
import Nav from "../../pages/website/components/nav/Nav"

const OwnerRoutes = () => {
    const { user } = useAuth()
    return (
        // user?.uid === process.env.REACT_APP_DEV_ID || user?.uid === process.env.REACT_APP_OWNER_ID ?
            true ? <div><Outlet /></div> : <Navigate to='/login' />
    )
}

export default OwnerRoutes