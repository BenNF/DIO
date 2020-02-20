
export const LoginSuccess = (user, profile) =>{
    return {
        type: "LOGIN_SUCCESS",
        payload: {
            user: user,
            profile: profile
        }
    }
}

export const SetProfile = (profile) => {
    return {
        type: "SET_PROFILE",
        payload: profile
    }
}

export const LogOut = () =>{
    return {
        type: 'LOG_OUT'
    }
}

