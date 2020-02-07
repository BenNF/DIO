import React from 'react'
import {SetProfile} from "../actions/authActions"
import {connect} from "react-redux"
//Rich owns this one

const Account = (props) => {
    return (
        <h1>This is the account page</h1>
    )
}
const mapStateToProps = (state) => {
    return {
        profile: state.auth.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        setProfile: (profile) => dispatch(SetProfile(profile))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Account);