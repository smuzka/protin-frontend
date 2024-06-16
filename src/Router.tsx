// Import necessary modules
import React, {ReactNode, useEffect, useState} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes,} from 'react-router-dom';


// Components for different pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import RandomUserPage from './pages/RandomUserPage';
import UserPage from './pages/UserPage';
import MatchedUsersPage from './pages/MatchedUsersPage';
import {doesJwtTokenExists, getJwtToken, removeJwtToken} from "./auth/auth";
import axios from "axios";
import NavButtons from "./components/NavButtons";

type ProtectedRouteProps = {
    children: ReactNode;
};

// Router component
const AppRouter = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(doesJwtTokenExists())

    useEffect(() => {
        setIsAuthenticated(doesJwtTokenExists())
    }, [getJwtToken()]);

    const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
        return isAuthenticated ? <>{children}</> : <Navigate to="/login"/>;
    };

    type GuestRouteProps = {
        children: ReactNode;
    };

    const GuestRoute: React.FC<GuestRouteProps> = ({children}) => {
        return !isAuthenticated ? <>{children}</> : <Navigate to="/profile"/>;
    };


    const logoutHandler = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/logout`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + getJwtToken(),
                    },
                }
            );

            if (response.status === 200) {
                removeJwtToken();
                window.location.reload();
            }
        } catch (error) {
            console.log('Something went wrong');
        }
    }

    return (
        <Router>
            <div className="w-full h-screen bg-gray-900">
                <div className="w-full h-full format dark:format-invert contents">
                    <div
                        className="w-full h-24 px-12 py-4 flex justify-between items-center justify-center border-b-2">
                        <a href="/" className="no-underline"><h1 className="m-0">Protin</h1></a>
                        <div>
                            <NavButtons logoutHandler={logoutHandler}/>
                        </div>
                    </div>
                    <div className="max-w-5xl px-2 py-5 mx-auto">
                        <Routes>
                            {/* Guest routes */}
                            <Route
                                path="/login"
                                element={
                                    <GuestRoute>
                                        <LoginPage/>
                                    </GuestRoute>
                                }
                            />
                            <Route
                                path="/register"
                                element={
                                    <GuestRoute>
                                        <RegisterPage/>
                                    </GuestRoute>
                                }
                            />

                            {/* Protected routes */}
                            <Route
                                path="/profile"
                                element={
                                    <ProtectedRoute>
                                        <ProfilePage/>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/random-user"
                                element={
                                    <ProtectedRoute>
                                        <RandomUserPage/>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/user/:id"
                                element={
                                    <ProtectedRoute>
                                        <UserPage/>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/matched-users"
                                element={
                                    <ProtectedRoute>
                                        <MatchedUsersPage/>
                                    </ProtectedRoute>
                                }
                            />

                            {/* Default route */}
                            <Route
                                path="*"
                                element={<Navigate to={isAuthenticated ? '/profile' : '/login'}/>}
                            />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    )
        ;
};

export default AppRouter;
