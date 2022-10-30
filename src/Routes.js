import React, { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
// Private Routes
import AdminRoutes from "./components/privateRoutes/AdminRoutes"
import OwnerRoutes from "./components/privateRoutes/OwnerRoutes"
// pages imports

import Loading from "./components/loadingAnimaitno/Loading"
import UserRotues from "./components/privateRoutes/UserRoutes"
import AddNewItems from "./components/addNewItems/AddNewItems"
import { DataProvider } from "./contexts/Database"
import Logo from "./components/loadingAnimaitno/Logo"
import History from "./pages/website/history/History"
import Settings from "./pages/website/settings/Settings"
import Workshop from "./pages/website/workhshops/Workshop"
import Profile from "./pages/website/profile/Profile"
import DashUsers from "./pages/system/dashboard/dashUsers/DashUsers"
import DashCommunity from "./pages/system/dashboard/dashCommu/DashCommunity"
import DashEvents from "./pages/system/dashboard/dashEvents/DashEvents"
import AccSettings from "./pages/website/accSettings/AccSettings"
const Login = React.lazy(() => import('./components/auth/Login'))
const Signup = React.lazy(() => import('./components/auth/SignUp'))
const Home = React.lazy(() => import("./pages/website/Home"))
const System = React.lazy(() => import('./pages/system/System'))
// const Profile = React.lazy(() => ihomport("./pages/website/profile/Profile"))
const MyOrders = React.lazy(() => import("./pages/website/myOrders/MyOrders"))
// const Workshop = React.lazy(() => import("./pages/website/workhshops/Workshop"))
const CommunityForm = React.lazy(() => import("./pages/website/forms/CommunityForm"))
const EditProfile = React.lazy(() => import("./pages/website/editprofile/EditProfile"))
// const Settings = React.lazy(() => import("./pages/website/settings/Settings"))
const Menu = React.lazy(() => import("./pages/website/menu/Menu"))
const Event = React.lazy(() => import('./pages/website/events/Evets'))
const Tikets = React.lazy(() => import("./pages/website/tikets/Tikets"))
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
            <Route path='/menu' element={<Suspense fallback={<Logo />}>
                <Menu />
            </Suspense>} />
            <Route path='/tikets' element={<Suspense fallback={<Logo />}>
                <Tikets />
            </Suspense>} />
            <Route path='/signup' element={<Suspense fallback={<Logo />}>
                <Signup />
            </Suspense>} />
            <Route exact path='/' element={<Suspense fallback={<Logo />}>
                <Home />
            </Suspense>} />
            <Route path="/workshops" element={<Workshop />} />

            {
                /* user Routes */
            }

            <Route element={<UserRotues />}>
                <Route path="/profile" element={
                    <DataProvider>
                        <Profile />
                    </DataProvider>
                } />
                <Route path="/profile/orders" element={
                    <DataProvider>
                        <MyOrders />
                    </DataProvider>
                } />

                <Route path="/events" element={
                    <DataProvider>
                        <Event />
                    </DataProvider>
                } />
                <Route path="/join-community-form" element={
                    <DataProvider>
                        <CommunityForm />
                    </DataProvider>
                } />
                <Route path="/edit-profile" element={
                    <DataProvider>
                        <EditProfile />
                    </DataProvider>
                } />
                <Route path="/settings" element={
                    <DataProvider>
                        <Settings />
                    </DataProvider>
                } />
                 <Route path="/settings/my-account" element={
                    <DataProvider>
                        <AccSettings />
                    </DataProvider>
                } />

                {
                    /* Admin Routes */
                }

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
                    </Route>
                </Route>
            </Route>
        </Routes>
    )
}
export default AllRoutes