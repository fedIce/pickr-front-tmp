import * as t from '../action-types'


const initialState = {
    profile: {

    }

}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.LOGGED_IN:
            return { ...state, isLoggedIn: true, user: action.user, error: null };

        case t.LOGGED_OUT:
            return { ...state, isLoggedIn: false, user: null, error: null };

        case t.LOGIN_FAILED:
            return { ...state, isLoggedIn: false, user: null, error: action.error };

        default:
            return state;
    }
};

export const placeOrder = (state = { status: null, error: null }, action) => {
    switch (action.type) {
        case t.START_ORDER:
            return { ...state, status: action.status, error: action.error }
        case t.FAILED_ORDER:
            return { ...state, status: action.status, error: action.error }
        case t.FINISHED_ORDER:
            return { ...state, status: action.status, error: action.error }
        default:
            return state
    }
}

export const fetchRequests = (state = { status: null, data: null, error: null }, action) => {
    switch (action.type) {
        case t.FETCHING_REQUESTS:
            return { ...state, status: action.status, data: null, error: null }
        case t.FETCHED_REQUESTS:
            return { ...state, status: action.status, data: action.data, error: null }
        case t.FETCH_REQUESTS_FAILED:
            return { ...state, status: action.status, data: null, error: action.error }

        default:
            return state
    }
}

export const fetchUser = (state = { status: null, data: null, error: null }, action) => {
    switch (action.type) {
        case t.FETCHING_USERS:
            return { ...state, status: action.status, data: null, error: null }
        case t.FETCHED_USERS:
            return { ...state, status: action.status, data: action.data, error: null }
        case t.FETCH_USERS_FAILED:
            return { ...state, status: action.status, data: null, error: action.error }

        default:
            return state
    }
}

export const cartUpdate = (state = { status: null, data: [], error: null }, action) => {
    switch (action.type) {
        case t.CART_ADD:
            return { ...state, status: action.status, data: action.data, error: null }
        case t.CART_DELETE:
            return { ...state, status: action.status, data: action.data, error: null }
        case t.CART_UPDATE_FAILED:
            return { ...state, status: action.status, data: [], error: action.error }
        case t.CART_UPDATE:
            return { ...state, status: action.status, data: action.data, error: null }
        default:
            return state
    }
}

export const loadProducts = (state = { status: null, data: null, error: null }, action) => {
    switch (action.type) {
        case t.LOADING_PRODUCTS:
            return { ...state, status: action.status, data: null, error: null }
        case t.LOADED_PRODUCTS:
            return { ...state, status: action.status, data: action.data, error: null }
        case t.LOAD_PRODUCTS_FAILED:
            return { ...state, status: action.status, data: null, error: action.error }

        default:
            return state
    }
}

export const loadCategory = (state = { status: null, data: null, error: null }, action) => {
    switch (action.type) {
        case t.LOADING_CATEGORY:
            return { ...state, status: action.status, data: null, error: null }
        case t.LOADED_CATEGORY:
            return { ...state, status: action.status, data: action.data, error: null }
        case t.LOAD_CATEGORY_FAILED:
            return { ...state, status: action.status, data: null, error: action.error }

        default:
            return state
    }
}

export const loadSupplier = (state = { status: null, data: null, error: null }, action) => {
    switch (action.type) {
        case t.LOADING_SUPPLIER:
            return { ...state, status: action.status, data: null, error: null }
        case t.LOADED_SUPPLIER:
            return { ...state, status: action.status, data: action.data, error: null }
        case t.LOAD_SUPPLIER_FAILED:
            return { ...state, status: action.status, data: null, error: action.error }

        default:
            return state
    }
}

export const fetchPrice = (state = { status: null, data: null, error: null }, action) => {
    switch (action.type) {
        case t.FETCHING_PRICE:
            return { ...state, status: action.status, data: null, error: null }
        case t.FETCHED_PRICE:
            return { ...state, status: action.status, data: action.data, error: null }
        case t.FETCH_PRICE_ERROR:
            return { ...state, status: action.status, data: null, error: action.error }

        default:
            return state
    }
}


export const errorreducer = (state = { status: null, data: null, error: null }, action) => {
    switch (action.type) {
        case t.ERROR:
            return { ...state, status: action.status, data: null, error: action.error, message: action.message }
        default:
            return state
    }
}



