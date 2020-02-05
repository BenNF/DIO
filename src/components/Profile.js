import React from 'react'
import {LoginSuccess} from "../actions/authActions"
import {connect} from "react-redux"

const Profile = (props) => {
    return (
        <h1>Profile</h1>
    )
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        loginAction : (user) => dispatch(LoginSuccess(user))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);