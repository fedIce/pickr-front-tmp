import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import * as t from '../action-types'
import { generateUUID } from '../../config/validate'

export const CreateOrder = (userId, data) => {
    return async (dispatch, getState, { getFirestore }) => {
        const db = getFirestore()

        dispatch({ type: t.START_ORDER, status: 'start' })

        console.log("Cart Data: ", data)

        if (data.courierInfo && data.courierInfo.type == 'shopping') {
            db.collection("DeliveryRequests").add({
                date: firebase.firestore.FieldValue.serverTimestamp(),
                courierInfo: data.courierInfo,
                fullName: data.fullName,
                phone: data.phone,
                avatar: data.avatar,
                country: data.country,
                state: data.state,
                senderId: userId,
                status: 'not_accepted',
                closestBustop: data.closestBustop,
                postCode: data.postCode,
                grocery: true,
                senderId: userId,
                paymentMethod: data.paymentMethod,
                extraData: data.extraData
            }).then(() => {
                dispatch({ type: t.FINISHED_ORDER, status: 'done' })
                dispatch(LoadRequests())
            }).catch(err => dispatch({ type: t.FAILED_ORDER, status: 'failed', error: err }))
            return
        } else if (data && data.type == 'taxi') {
            db.collection("DeliveryRequests").add({
                date: firebase.firestore.FieldValue.serverTimestamp(),
                ...data,
                taxi: true,
                senderId: userId,
                status: 'not_accepted',
                paymentMethod: data.paymentMethod,
                // sender: data.senderInfo,
            }).then(() => {
                dispatch({ type: t.FINISHED_ORDER, status: 'done' })
                dispatch(LoadRequests())
            })
            return
        }

        db.collection("DeliveryRequests").add({
            date: firebase.firestore.FieldValue.serverTimestamp(),
            courierInfo: {
                height: data._height,
                length: data._length,
                width: data._width,
                deliveryMode: data.deliveryMode,
                extraInfo: data.extraInfo,
                fragiable: data.fragiable,
                imageURL: data.imageURL,
                paymentMethod: data.paymentMethod,
                prize: data.prize,
                type: data.type,
                weight: data.weight,

            },
            fullName: data.fullName,
            phone: data.phone,
            country: data.country,
            state: data.state,
            avatar: data.avatar,
            senderId: userId,
            status: 'not_accepted',
            sender: data.senderInfo,
            reciever: data.recieverInfo,
        }).then(() => {
            dispatch({ type: t.FINISHED_ORDER, status: 'done' })
            dispatch(LoadRequests())
        })
    }
}

export function login(data) {
    return (dispatch) => {

        const auth = firebase.auth()
        return new Promise((resolve, reject) => {
            const { email, password } = data;
            auth.signInWithEmailAndPassword(email, password)
                .then((resp) => {
                    firebase.firestore().collection('Users').doc(resp.user.uid).get()
                        .then(user => {
                            dispatch({ type: t.LOGGED_IN, user: { id: resp.user.uid, ...user.data() } })
                        })
                })
                .catch((error) => {
                    dispatch({ type: t.LOGIN_FAILED, error: error })
                    reject(error)
                });
        });
    }
}

export function setUserData(data) {
    return (dispatch) => {
        dispatch({ type: t.LOGGED_IN, user: data })
    }
}

export const clearAuthState = () => {
    return (dispatch) => {
        dispatch({ type: t.LOGGED_OUT, error: null, user: null })
    }
}

export function register(data) {
    return (dispatch, getState, { getFirestore }) => {

        const db = getFirestore()
        // const uid = getState().firebase.auth.uid
        const auth = firebase.auth()

        return new Promise((resolve, reject) => {
            const { email, password, username } = data;
            //Create New user from email and password

            const displayPicture = `https://robohash.org/${(Math.random() * 100) + 1}.png?set=${(Math.random() * 4) + 1}`

            auth.createUserWithEmailAndPassword(email, password)
                .then((resp) => {

                    let user = auth.currentUser
                    const uid = resp.user.auth.currentUser.uid
                    user.updateProfile({
                        displayName: username,
                        photoURL: displayPicture,
                        email: email,
                        uid: uid
                    }).then(res => {

                        //Initialize User Object with profilerelated ifnformation
                        db.collection('Users').doc(uid).set({
                            requests: [],
                            uid: uid,
                            avatar: displayPicture,
                            username: username,
                            updated: false,
                            role: 'client',
                            email: email,


                        }).then((res) => {

                            auth.currentUser && auth.currentUser.sendEmailVerification()
                            dispatch({ type: t.LOGGED_IN, user: resp.user })

                        }).catch(err => {
                            dispatch({ type: t.LOGIN_FAILED, error: err })
                            console.log("MY CREATION FAILLED: " + err)
                        })
                    })
                        .catch(err => { console.warn("Create User Error: " + err) })


                    resolve(resp)
                }).catch(err => {
                    reject(err)
                    dispatch({ type: t.LOGGED_OUT, err })
                })
        })
    };
}

export function getPrice(countryCode) {
    return (dispatch) => {

        dispatch({ type: t.FETCHING_PRICE, status: 'start', data: null, error: null })

        const db = firebase.firestore()
        const auth = firebase.auth()

        var temp = null

        db.collection("price").doc(countryCode).get().then(querySnapshot => {
            temp = { price: querySnapshot.data() }
            dispatch({ type: t.FETCHED_PRICE, status: 'done', data: temp, error: null })

        }).catch(err => {
            console.log(err)
            dispatch({ type: t.FETCH_PRICE_ERROR, status: 'failed', data: null, error: err })

        })

    }
}

export const LoadRequests = (uid) => {
    return (dispatch) => {

        dispatch({ type: t.FETCHING_REQUESTS, status: 'start' })
        const db = firebase.firestore()
        const auth = firebase.auth()

        var temp = []

        db.collection("DeliveryRequests").where('senderId', '==', uid).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                temp.push({ id: doc.id, ...doc.data() })
            })
            dispatch({ type: t.FETCHED_REQUESTS, status: 'done', data: temp, error: null })

        }).catch(err => {
            dispatch({ type: t.FETCH_REQUESTS_FAILED, status: 'failed', data: null, error: err })
        })

    }
}

export const LoadHistory = (userId) => {
    return (dispatch) => {

        const db = firebase.firestore()
        const auth = firebase.auth()

        var temp = []

        db.collection("History").where('uid', '==', userId).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                temp.push({ id: doc.id, ...doc.data() })
            })

        }).catch(err => {
            console.log(err)
        })

    }
}

export const DeleteRequests = (id) => {
    return (dispatch) => {

        const db = firebase.firestore()

        db.collection("DeliveryRequests").doc(id).delete().then(querySnapshot => {
            dispatch(LoadRequests())
        }).catch(err => {
            dispatch({ type: t.ERROR, status: 'failed', data: null, error: err, message: 'Could not cancel this order' })
        })

    }
}

export const updateOrderStatus = (docId, status, user = null) => {
    return (dispatch) => {
        const db = firebase.firestore()
        console.log(status)
        if (status == 'delivered') {
            db.collection("DeliveryRequests").doc(docId).update({
                status: status
            }).then(() => {
                dispatch(LoadRequests())
            }).catch(err => {
                dispatch({ type: t.ERROR, status: 'failed', data: null, error: err, message: 'order update failed' })
            })

            return true
        }
    }
}

export const FetchUser = (uid) => {
    return (dispatch, getState, { getFirestore }) => {

        // dispatch({ type: t.FETCHING_USERS, status: 'start' })
        const db = getFirestore()
        const auth = firebase.auth()

        var temp = []

        db.collection("Users").doc(uid).get().then(querySnapshot => {
            temp.push({ id: querySnapshot.id, ...querySnapshot.data() })

            dispatch({ type: t.FETCHED_USERS, status: 'done', data: temp, error: null })

        }).catch(err => {
            console.log('FETCH ERROR: ', err)
            dispatch({ type: t.FETCH_USERS_FAILED, status: 'failed', data: null, error: err })
        })

    }
}

export const updateCart = () => {
    return (dispatch) => {
        const cart = [] // fetch cart data
        cart.then(data => {
            dispatch({ type: t.CART_UPDATE, status: 'updated', data: data, error: null })
        }).catch(err => {
            dispatch({ type: t.CART_UPDATE_FAILED, data:[], status: 'failed', error: err })
        })
    }
}

export const LoadProducts = () => {
    return (dispatch, getState, { getFirestore }) => {
        const db = getFirestore()
        const temp = []

        dispatch({ type: t.LOADING_PRODUCTS, status: 'loading', data: null, error: null })

        db.collection('Products').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    temp.push({ id: doc.id, ...doc.data() })
                })
                dispatch({ type: t.LOADED_PRODUCTS, status: 'done', data: temp })
            }).catch(err => {
                dispatch({ type: t.LOAD_PRODUCTS_FAILED, status: 'failed', data: null, error: err })
                console.log(err)
            })
    }
}

export const LoadCategories = () => {
    return (dispatch) => {
        const temp = []
        const db = firebase.firestore()
        dispatch({ type: t.LOADING_CATEGORY, status: 'loading', data: null, error: null })

        db.collection('Category').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    temp.push({ id: doc.id, ...doc.data() })
                })
                dispatch({ type: t.LOADED_CATEGORY, status: 'done', data: temp })
            }).catch(err => {
                dispatch({ type: t.LOAD_CATEGORY_FAILED, status: 'failed', data: null, error: err })
                console.log(err)
            })
    }
}

export const LoadSupplier = () => {
    return (dispatch) => {
        const temp = []
        const db = firebase.firestore()
        dispatch({ type: t.LOADING_SUPPLIER, status: 'loading', data: null, error: null })

        db.collection('Supplier').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    temp.push({ id: doc.id, ...doc.data() })
                })
                dispatch({ type: t.LOADED_SUPPLIER, status: 'done', data: temp })
            }).catch(err => {
                dispatch({ type: t.LOAD_SUPPLIER_FAILED, status: 'failed', data: null, error: err })
                console.log(err)
            })
    }
}

export const localCartUpdate = (data, type) => {
    return (dispatch) => {
        dispatch({ type: type, status: 'done', data: data })
    }
}