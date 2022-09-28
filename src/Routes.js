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
import System from './pages/system/System'
import Logo from "./components/loadingAnimaitno/Logo"
const Orders = React.lazy(() => import("./pages/system/orders/Orders"))
const Page404 = React.lazy(() => import("./components/404/Page404"))
const Ledger = React.lazy(() => import("./pages/system/ledger/Ledger"))


const AllRoutes = () => {
    return (
        <Routes>
            {/* Public */}
            <Route path='/login' element={<Suspense fallback={<Logo />}>
                <Login />
            </Suspense>} />
            <Route path='/signup' element={<Suspense fallback={<Logo />}>
                <Signup />
            </Suspense>} />
            <Route exact path='/' element={<Suspense fallback={<Logo />}>
                <Home />
            </Suspense>} />

            <Route path='*' element={
                <Suspense fallback={<Logo />}>
                    <Page404 />
                </Suspense>
            } />
            <Route element={<UserRotues />}>
                <Route element={<AdminRoutes />} >
                    <Route path="/cashier.system" element={
                        <DataProvider>
                            <System />
                        </DataProvider>
                    } />
                    <Route path="/cashier.system/add-new-item" element={
                        <Suspense fallback={<Logo />}>
                            <DataProvider>
                                <AddNewItems />
                            </DataProvider>

                        </Suspense>
                    } />
                    <Route path="/cashier.system/orders" element={
                        <Suspense fallback={<Logo />}>
                            <DataProvider>
                                <Orders />
                            </DataProvider>
                        </Suspense>
                    } />

                    <Route element={<OwnerRoutes />}>
                        <Route path="/cashier.system/orders/ledger" element={
                            <Suspense fallback={<Logo />}>
                                <DataProvider>
                                    <Ledger />
                                </DataProvider>
                            </Suspense>
                        } />
                    </Route>
                </Route>
            </Route>

        </Routes>
    )
}
export default AllRoutes