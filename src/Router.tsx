// Import necessary modules
import React, {ReactNode} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';


// Components for different pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import RandomUserPage from './pages/RandomUserPage';
import UserPage from './pages/UserPage';
import MatchedUsersPage from './pages/MatchedUsersPage';
import {doesJwtTokenExists} from "./auth/auth";

const isAuthenticated = () => {
    return doesJwtTokenExists();
};

type ProtectedRouteProps = {
    children: ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    return isAuthenticated() ? <>{children}</> : <Navigate to="/login" />;
};

type GuestRouteProps = {
    children: ReactNode;
};

const GuestRoute: React.FC<GuestRouteProps> = ({ children }) => {
    return !isAuthenticated() ? <>{children}</> : <Navigate to="/profile" />;
};

// Router component
const AppRouter = () => {
    return (
        <Router>
            <Routes>
                {/* Guest routes */}
                <Route
                    path="/login"
                    element={
                        <GuestRoute>
                            <LoginPage />
                        </GuestRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <GuestRoute>
                            <RegisterPage />
                        </GuestRoute>
                    }
                />

                {/* Protected routes */}
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/random-user"
                    element={
                        <ProtectedRoute>
                            <RandomUserPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/user/:id"
                    element={
                        <ProtectedRoute>
                            <UserPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/matched-users"
                    element={
                        <ProtectedRoute>
                            <MatchedUsersPage />
                        </ProtectedRoute>
                    }
                />

                {/* Default route */}
                <Route
                    path="*"
                    element={<Navigate to={isAuthenticated() ? '/profile' : '/login'} />}
                />
            </Routes>
        </Router>
    );
};

export default AppRouter;
