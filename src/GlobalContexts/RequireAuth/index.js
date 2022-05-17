import React from 'react';
import { Navigate, useLocation } from "react-router";
import LoginNotice from '../../Components/LoginNotice';
import { useAuth } from '../AuthProvider';

function RequireAuth({ children }) {
    let auth = useAuth();
    let location = useLocation();

    if (!auth.user) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <LoginNotice location={location} />
    } else if (auth.user && !auth.user.emailVerified) {
        return <Navigate to="/verify_email" state={{ from: location }} replace />;
    }


    return children;
}

export { RequireAuth }