import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import Footer from "./pages/website/footer/Footer"
import AllRoutes from "./Routes"


const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AllRoutes />
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App