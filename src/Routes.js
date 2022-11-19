import React, { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
// Private Routes
import AdminRoutes from "./components/privateRoutes/AdminRoutes"
import OwnerRoutes from "./components/privateRoutes/OwnerRoutes"
// pages imports
import UserRotues from "./components/privateRoutes/UserRoutes"
import AddNewItems from "./components/addNewItems/AddNewItems"
import { DataProvider } from "./contexts/Database"
import Logo from "./components/loadingAnimaitno/Logo"
import Settings from "./pages/system/settings/Settings"
import DashUsers from "./pages/system/dashboard/dashUsers/DashUsers"
import DashCommunity from "./pages/system/dashboard/dashCommu/DashCommunity"
import DashEvents from "./pages/system/dashboard/dashEvents/DashEvents"
import AccSettings from "./pages/system/accSettings/AccSettings"
import ProductList from "./pages/system/dashboard/productList/ProductList"
const Login = React.lazy(() => import('./components/auth/Login'))
const Signup = React.lazy(() => import('./components/auth/SignUp'))
const System = React.lazy(() => import('./pages/system/System'))
// const Profile = React.lazy(() => ihomport("./pages/website/profile/Profile"))
// const Workshop = React.lazy(() => import("./pages/website/workhshops/Workshop"))
// const Settings = React.lazy(() => import("./pages/website/settings/Settings"))
const Orders = React.lazy(() => import("./pages/system/orders/Orders"))
const Page404 = React.lazy(() => import("./components/404/Page404"))
const Ledger = React.lazy(() => import("./pages/system/ledger/Ledger"))
const Dashboard = React.lazy(() => import("./pages/system/dashboard/Dashboard"))




const AllRoutes = () => {
    return (
        <Routes>
            {
                /* Public */
            }
            <Route path='*' element={<Suspense fallback={<Logo />}>
                <Page404 />
            </Suspense>} />
            <Route path='/login' element={<Suspense fallback={<Logo />}>
                <Login />
            </Suspense>} />
            <Route path='/signup' element={<Suspense fallback={<Logo />}>
                <Signup />
            </Suspense>} />

            {/* <Route path="/settings/reset-password" element={
                <DataProvider>
                    <AccSettings />
                </DataProvider>
            } /> */}

            {
                /* user Routes */
            }

            <Route element={<UserRotues />}>
                <Route path="/settings" element={
                    <DataProvider>
                        <Settings />
                    </DataProvider>
                } />
                {
                    /* Admin Routes */
                }

                <Route element={<AdminRoutes />} >
                    <Route exact path='/' element={<Suspense fallback={<Logo />}>
                        <DataProvider>
                            <Dashboard />
                        </DataProvider>
                    </Suspense>} />
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

                    {
                        /* Owner Routes */
                    }

                    <Route element={<OwnerRoutes />}>
                        <Route path="/cashier.system/orders/ledger" element={
                            <Suspense fallback={<Logo />}>
                                <DataProvider>
                                    <Ledger />
                                </DataProvider>
                            </Suspense>
                        } />
                        <Route path="/admin-dashboard" element={
                            <Suspense fallback={<Logo />}>
                                <DataProvider>
                                    <Dashboard />
                                </DataProvider>
                            </Suspense>
                        } />
                        <Route path="/admin-dashboard/users" element={
                            <Suspense fallback={<Logo />}>
                                <DataProvider>
                                    <DashUsers />
                                </DataProvider>
                            </Suspense>
                        } />
                        <Route path="/admin-dashboard/community.members" element={
                            <Suspense fallback={<Logo />}>
                                <DataProvider>
                                    <DashCommunity />
                                </DataProvider>
                            </Suspense>
                        } />
                        <Route path="/admin-dashboard/all-events" element={
                            <Suspense fallback={<Logo />}>
                                <DataProvider>
                                    <DashEvents />
                                </DataProvider>
                            </Suspense>
                        } />
                            <Route path="/admin-dashboard/all-products" element={
                            <Suspense fallback={<Logo />}>
                                <DataProvider>
                                    <ProductList />
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