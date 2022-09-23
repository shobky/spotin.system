import React, { Suspense } from "react";
import ReactDOM from "react-dom/client"
import Loading from "./components/loadingAnimaitno/Loading"
import './global.css'
import './assets/fonts/fonts.css'
const App = React.lazy(() => import('./App'))

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Suspense fallback={
            <Loading />
        }>
            <App />
        </Suspense>
    </React.StrictMode>
)