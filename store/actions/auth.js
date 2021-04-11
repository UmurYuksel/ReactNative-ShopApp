import { AsyncStorage } from 'react-native';


let timer;

export const authenticate = (userId, token, expiryTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTime));
        dispatch({ type: 'AUTHENTICATE', userId: userId, token: token });
    }

}


export const setDidTryAl = () => {
    return {
        type:'SET_DID_TRY_AL'
    }
}

export const signUp = (email, password) => {
    return async dispatch => {

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[YOUR API KEY]', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wrong';
            if (errorId === 'EMAIL_EXISTS') {
                message = 'Email is already exists!';
            }

            throw new Error(message);
        }

        const resData = await response.json();

        dispatch(authenticate(
            resData.localId,
            resData.idToken,
            parseInt(resData.expiresIn) * 1000
        ));

        const expirationDate = new Date(
            new Date().getTime() + parseInt(resData.expiresIn) * 1000
        );
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    }
};

export const logIn = (email, password) => {
    return async dispatch => {

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[YOUR API KEY]', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wrong';
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'Email does not exists!';
            } if (errorId === 'INVALID_PASSWORD') {
                message = 'Wrong Password';
            }

            throw new Error(message);
        }

        const resData = await response.json();

        dispatch(
            authenticate(
                resData.localId,
                resData.idToken,
                parseInt(resData.expiresIn) * 1000
            ));
        const expirationDate = new Date(
            new Date().getTime() + parseInt(resData.expiresIn) * 1000
        );
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    }
};

export const logout = () => {
    clearLogoutTimer();
    AsyncStorage.removeItem('userData');
    return {
        type: 'LOGOUT'
    };
}

clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }
}

const setLogoutTimer = expirationTime => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    }
}

//Save string to the device
const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token: token,
            userId: userId,
            expiryDate: expirationDate.toISOString()
        }));
}