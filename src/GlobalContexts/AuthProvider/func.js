export const errorFromCode = (error) => {
    switch(error.code){
        case 'auth/invalid-email':
            return "Please enter a valid email."
        case "auth/wrong-password":
            return "invalid credentials, please check your email and password"
        case "auth/too-many-requests":
            return "Too many attempts, account temporarily disabled, try again later."
        case "auth/user-not-found":
            return "User not found, check your email and try again."
        default:
            return error.message.split(':')[1].split('(')[0]
    }
}