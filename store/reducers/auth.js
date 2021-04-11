initialState = {
    token: null,
    userId: null,
    didTryAutoLogin: false
}


export default (state = initialState, action) => {
    switch (action.type) {
        case ('AUTHENTICATE'):
            return {
                token: action.token,
                userId: action.userId,
                didTryAutoLogin:true
            }
        case ('LOGOUT'):
            return initialState;
        case('SET_DID_TRY_AL'):
            return {
                ...state,
                didTryAutoLogin:true
            }
        default:
            return state;
    }
}