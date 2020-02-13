const initState = {
    user: null,
    login: false,
    profile: {}
}


const auth = (state = initState, action) => {
    console.log("auth", action)
    switch(action.type){
        case "LOGIN_SUCCESS": return {
            ...state,
            user: action.payload.user,
            profile: action.payload.profile,
            login: true
        }
        case "SET_PROFILE": return {
            ...state,
            profile: action.payload
        }
    
        default: return state
    }
}
export default auth;