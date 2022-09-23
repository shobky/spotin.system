import React, { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
// Private Routes
import AdminRoutes from "./components/privateRoutes/AdminRoutes"
import OwnerRoutes from "./components/privateRoutes/OwnerRoutes"
// pages imports
import Login from './components/auth/Login'
import Signup from './components/auth/SignUp'
import Home from "./pages/website/Home"
import Loading from "./components/loadingAnimaitno/Loading"
import UserRotues from "./components/privateRoutes/UserRoutes"
import AddNewItems from "./components/addNewItems/AddNewItems"
import { DataProvider } from "./contexts/Database"
const Orders = React.lazy(() => import("./pages/system/orders/Orders"))
const System = React.lazy(() => import('./pages/system/System'))

const AllRoutes = () => {
    return (
        <Routes>
            {/* Public */}
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route exact path='/' element={<Home />} />
            <Route element={<UserRotues />}>
                <Route element={<AdminRoutes />} >
                    <Route path="/cashier.system" element={
                        <Suspense fallback={<Loading />}>
                            <DataProvider>
                                <System />
                            </DataProvider>
                        </Suspense>
                    } />
                    <Route path="/cashier.system/add-new-item" element={
                        <Suspense fallback={<Loading />}>
                            <DataProvider>
                                <AddNewItems />
                            </DataProvider>

                        </Suspense>
                    } />
                    <Route path="/cashier.system/orders" element={
                        <Suspense fallback={<Loading />}>
                            <DataProvider>
                                <Orders />
                            </DataProvider>
                        </Suspense>
                    } />

                    <Route element={<OwnerRoutes />}>
                    </Route>
                </Route>
            </Route>

        </Routes>
    )
}
export default AllRoutes