import "./App.css";
import Root from "./Root";
import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SigninPage from "./pages/SigninPage/SigninPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import Profile from "./components/Profile/Profile";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ProtectedRouter from "./components/hoc/ProtectedRoute";
import axiosInstance, { setAccessToken } from "./axiosInstance";

function App() {
    const [user, setUser] = useState();
    const [card, setCard] = useState([]);

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
                    element: (
                        <HomePage user={user} card={card} setCard={setCard} 
                    />
                    ),
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
                    path: "/profile",
                    element: (
                        <Profile
                            setUser={setUser}
                            user={user}
                            card={card}
                            setCard={setCard}
                           
                        />
                    ),
                },
                {
                    path: "/profile",
                    element: (
                        <ProtectedRouter
                            isAllowed={user !== null}
                            redirectPath="/"
                        >
                            <Profile userId={user ? user.id : null} />
                        </ProtectedRouter>
                    ),
                },
                {
                    path: "/*",
                    element: <NotFoundPage />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;