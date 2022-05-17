import firebase, { auth } from "../../config/firebase";
import { country_list } from "../../screens/Dashboard/Product/ProfileUpdateForm/data";

const authProvider = {
    isAuthenticated: false,
    signin(callback) {
        authProvider.isAuthenticated = true;
        callback()
    },
    signout(callback) {
        authProvider.isAuthenticated = false;
        callback()
    },
    getuser(callback) {
        return callback()
    }
}

export { authProvider }

export const login = async (email, password) => {


}

export const load_user = async () => {

}

export const sign_out_user = async () => {

}

export const findSetListValue = (list, value) => {
    const item = list.filter(i => i.title === value || i.value === value)
    if(item.length > 0){
        return item[0]
    }else{
        return list[0]
    }
}

export const updateUser = async (data) => {
    console.log('==>', data)
    firebase.firestore().collection('Users').doc(data.uid).update({
        avatar: data.imageUri,
        username: data.displayName,
        fullName: data.fullName,
        phone: data.phone,
        address: data.address,
        link: data.email,
        city: data.city,
        extra: data.extra,
        state: data.state,
        country: data.country,
        updated: true
    })
}