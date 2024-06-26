import "./App.css";
import Root from "./Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SigninPage from "./pages/SigninPage/SigninPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { useEffect, useState } from "react";
import axiosInstance, { setAccessToken } from "./axiosInstance";

function App() {
    const [user, setUser] = useState();

    useEffect(() => {
        axiosInstance(`${import.meta.env.VITE_API}/tokens/refresh`).then(
            (res) => {
                setUser(res.data.user);
                setAccessToken(res.data.accessToken);
            }
        );
    }, []);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root user={user} setUser={setUser} />,
            children: [
                {
                    path: "/",
                    element: <HomePage user={user} />,
                },
                {
                    path: "/main",
                    element: <HomePage user={user} />,
                },
                {
                    path: "/signin",
                    element: <SigninPage setUser={setUser} />,
                },
                {
                    path: "/signup",
                    element: <SignupPage setUser={setUser} />,
                },
                {
                    path: "/not-found",
                    element: <NotFoundPage />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
