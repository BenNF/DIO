
export const LoginSucess = (user) =>{
    console.log("do login?")
    return {
        type: "LOGIN_SUCCESS",
        payload: user
    }
}
