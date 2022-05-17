import React from 'react';
import { Navigate, useLocation } from "react-router";
import { useAuth } from '../AuthProvider';
import firebase from '../../config/firebase'


function RequireNoAuth({ children }) {
    let auth = useAuth();
    let location = useLocation();

    if (auth.user) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/dashboard" state={{ from: location }} replace />;
    }

    return children;
}

export { RequireNoAuth }