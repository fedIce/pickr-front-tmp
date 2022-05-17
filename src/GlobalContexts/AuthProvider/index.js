import React from 'react';
import { connect } from 'react-redux';
import { authProvider, sign_out_user } from '../../functions/authFunctions';
import { clearAuthState, login, register } from '../../redux/actions';
import { useAlert } from '../ErrorContext';
import { errorFromCode } from './func';
import firebase, { auth } from '../../config/firebase'

const inital_user = {
    user: null,
    signin: () => null,
    signup: () => null,
    signout: () => null,
    getuser: () => null
}


const AuthContext = React.createContext(inital_user)


function AuthProvider({ children, registerUser, clearAuth, signoutuser, loginUser, _user }) {

    let alert = useAlert();

    const handleAlert = (error, type) => {
        alert.setalert(error)
        alert.settype(type)
        alert.closealert()
    }
    const [user, setUser] = React.useState(null);

    let signin = (newUser, callback) => {
        (async () => {
            await loginUser(newUser)
        })().then(() => {
            // after login
        }).catch(err => {
            handleAlert({ title: 'User Error', body: errorFromCode(err), type: 'error' }, 'error')
        }).finally(() => callback && callback())
    };

    let signup = (user, callback) => {
        (async () => {
            await registerUser(user)
        })().then(async () => {
            // after signup
            await auth.currentUser.sendEmailVerification()
        }).catch(err => {
            handleAlert({ title: 'User Error', body: errorFromCode(err), type: 'error' }, 'error')
        }).finally(() => callback && callback())
    }

    let signout = (callback) => {
        (async () => {
            await signoutuser()
        })().then(() => {
            // after sign out
            clearAuth()
            setUser(null)
        }).catch(err => {
            handleAlert({ title: 'User Error', body: errorFromCode(err) }, 'error')
        }).finally(() => callback && callback())
    }

    let getuser = (callback) => {

    }


    let value = { user: _user ? auth.currentUser : null, signin, signout, getuser, signup };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => React.useContext(AuthContext);

const mapStateToProps = (state) => {
    return {
        currentUser: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (data) => dispatch(login(data)),
        signoutuser: () => {
            firebase.auth().signOut()
            console.log('Signed Out')
        },
        registerUser: (data) => dispatch(register(data)),
        clearAuth: () => dispatch(clearAuthState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthProvider) 