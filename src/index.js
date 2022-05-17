import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import rootReducer from './redux/reducers/rootReducer';
import { FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
// import { configureStore } from '@reduxjs/toolkit';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase'
import firebase from './config/firebase';
import { createFirestoreInstance } from 'redux-firestore';

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// const store = configureStore({
//     reducer: rootReducer,
//     middleware: [thunk],
//     enhancers: [reduxFirestore(firebase, rrfConfig)]
// })
const enhancer = compose(applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })), reduxFirestore(firebase, rrfConfig))
const store = createStore(rootReducer, enhancer)

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance // <- needed if using firestore
}


const persist = persistStore(store)

const container = document.getElementById('root')

const root = ReactDOMClient.createRoot(container)

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps} >
                <PersistGate persistor={persist}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </PersistGate>
            </ReactReduxFirebaseProvider>
        </Provider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

