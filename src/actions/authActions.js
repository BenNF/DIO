
export const LoginSuccess = (user) =>{
    return {
        type: "LOGIN_SUCCESS",
        payload: user
    }
}

export const SetProfile = (profile) => {
    return {
        type: "SET_PROFILE",
        payload: profile
    }
}

