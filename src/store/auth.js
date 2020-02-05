
const auth = (state= {user: null, login: false}, action) => {
    console.log("auth", action)
    switch(action.type){
        case "LOGIN_SUCCESS": return {
            ...state,
            user: action.payload,
            login: true
        }
        default: return state
    }
}
export default auth;