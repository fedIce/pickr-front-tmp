import firebase from '../../config/firebase'

export const _useInvisibleRechaptcher = async (buttonId, callback) => {
    try {
        firebase.auth().languageCode = 'en';
        return window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(buttonId, {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                callback && callback(response);
            }
        });
    } catch (e) {
        return { error: e }
    }
}

export const _useRecaptchaWidget = async (recaptcha_element) => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(recaptcha_element);
    return await window.recaptchaVerifier
}


export const specifyRecaptChaParams = (recaptcha_element) => {
    //OPTIONAL
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(recaptcha_element, {
        'size': 'normal',
        'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // ...
        },
        'expired-callback': () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
        }
    });
}

export const preRenderRecaptcha = () => {
    window.recaptchaVerifier.render().then((widgetId) => {
        window.recaptchaWidgetId = widgetId;
    });
}

export const resetWidgetId = () => {
    // Or, if you haven't stored the widget ID:
    window.recaptchaVerifier.render().then(function (widgetId) {
        // grecaptcha.reset(widgetId);
    });
}

export const getRecaptchaWidgetId = () => {
    return window.recaptchaWidgetId;

}

export const signInWithPhoneNumber = async (phoneNum) => {
    const phoneNumber = phoneNum;
    const appVerifier = window.recaptchaVerifier;
    return await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            return confirmationResult
            // ...
        }).catch((error) => {
            // Error; SMS not sent
            // ...
            return { error }

        });
}

export const signInUserWithCode = async (OTPCode, confirmationResult) => {
    const code = OTPCode

    return await confirmationResult.confirm(code).then((result) => {
        // User signed in successfully.
        const user = result.user;
        // ...
    }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        console.log(error)
        return { error }
    });

}

export const preparePhoneSignInRecaptcha = async (buttonId, recaptcha_element_id) => {
    return await _useInvisibleRechaptcher(buttonId, console.log).then(async (i) => {
        if (i?.error) {
            return i
        }
        const wid = await _useRecaptchaWidget(recaptcha_element_id)
    }).catch((e) => e)
}