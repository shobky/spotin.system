import React, { Suspense } from "react";
import ReactDOM from "react-dom/client"
import Loading from "./components/loadingAnimaitno/Loading"
import './global.css'
import './assets/fonts/fonts.css'
import Logo from "./components/loadingAnimaitno/Logo";
const App = React.lazy(() => import('./App'))

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Suspense fallback={
            <Logo />
        }>
            <App />
        </Suspense>
    </React.StrictMode>
)