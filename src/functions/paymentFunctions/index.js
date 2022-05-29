// paymentMethod: activeMethod,
// country: _info.country,
// state: _info.state,
// avatar: userState.avatar,
// closestBustop: userState.closestBustop,
// postCode: userState.postCode,
// prize: props.navigation.state.params.prize

// fullName: "Donald Anyanwu Anya",
// paymentMethod: "Cash On Drop",
// phone: "+905338463284",
// postCode: "",
// state: "Lefkoşa",



// imageUrl
// name
// price
// extra
// pid
// count
// id

export const emptyStringIfUNDEFINED = (data) => {
    if (data === undefined) {
        return ''
    }
    return data
}

export const sanitizeOrder = async (check_out_data) => {

    try {
        const courierInfo = { prize: parseFloat(check_out_data.total).toFixed(2), discount: check_out_data.totalDiscount, delivery: check_out_data.delivery, type: 'shopping', cartData: check_out_data.cartData }
        const order = {
            paymentMethod: check_out_data.paymentMethod,
            country: emptyStringIfUNDEFINED(check_out_data.user?.country),
            state: emptyStringIfUNDEFINED(check_out_data.user?.city),
            avatar: check_out_data.user.avatar,
            courierInfo,
            closestBustop: emptyStringIfUNDEFINED(check_out_data.user.closestBustop),
            postCode: emptyStringIfUNDEFINED(check_out_data.user?.postalCode),
            fullName: check_out_data.user.fullName,
            phone: check_out_data.user.phone,
            extraData: { address: check_out_data.user.delivery_address ? check_out_data.user.delivery_address.address : check_out_data.user.address  }
        }
        return order
    } catch (e) {
        return { error: e }
    }

}

export const hasRequiredCheckoutInfo = (data) => {
    console.log(data)
    if(!(data.address && data.phoneNumber && data.email && data.city && data.country)){
        return false
    }
    return true
}