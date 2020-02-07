import React, {useState} from 'react'
import {LoginSuccess} from "../actions/authActions"
import {connect} from "react-redux"
//RUDY owns this one


const Profile = (props) => {
    const p = {
        //some default profile
    }
    const [profile, setProfile] = useState(p);

    return (
        <h1>This is the profile page</h1>
    )
}

export default Profile;