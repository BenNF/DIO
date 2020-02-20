import React from 'react';
import {SetProfile} from "../actions/authActions";
import {connect} from "react-redux";
import {Link} from "react-router-dom"
import {Form, Checkbox, Button, Message} from "semantic-ui-react";
import {EDIT_ACCOUNT} from "../routing/routes";
//Rich owns this one

const Account = (props) => {
    return (
        <div>
            <h1>My Account</h1>
            <h1>{props?.profile?.name}</h1>         
            <h1>{props?.profile?.bio}</h1>    
            <h1>{props?.profile?.location}</h1>

            <div>
                <Link to={EDIT_ACCOUNT}>
                    <Button>Edit Account</Button>
                </Link>
            </div>

            <div>
                <img src={ require('./stock.jpg') } />
            </div>
        </div>
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