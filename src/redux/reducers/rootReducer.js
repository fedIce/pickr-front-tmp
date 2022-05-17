import {combineReducers} from 'redux'
import * as reducer from './reducers'
import projectReducer  from './ProjectReducers'
import storage from 'redux-persist/lib/storage';
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import {persistReducer} from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth','price', 'cart'],
  };

const rootReducer = combineReducers({
    auth: reducer.authReducer,
    project: projectReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    placeOrder: reducer.placeOrder,
    requests: reducer.fetchRequests,
    currentUser: reducer.fetchUser,
    products: reducer.loadProducts,
    categories: reducer.loadCategory,
    price: reducer.fetchPrice,
    cart: reducer.cartUpdate,
    supplier: reducer.loadSupplier,
    error: reducer.errorreducer
})

export default persistReducer( persistConfig, rootReducer)