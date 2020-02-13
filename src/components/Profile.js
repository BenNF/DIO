import React, {useState, useContext, useEffect} from 'react'
import {LoginSuccess} from "../actions/authActions"
import {FirebaseContext} from "../store/Firebase"
import {connect} from "react-redux"
//RUDY owns this one

const Profile = (props) => {
    const firebase = useContext(FirebaseContext);
    const [profile,
        setProfile] = useState({});
    const userID = props
        ?.match
            ?.params.id

    useEffect(() => {
        if (userID) {
            firebase
                .doLoadUserProfile(userID)
                .then((doc) => {
                    const profile = {
                        ...doc.data(),
                        uid: userID
                    }
                    setProfile(profile)
                })
                .catch(error => console.log(error))
        }
    }, [])

    return (
        <div>
            <h1>{profile
                    ?.name}</h1>
            <h1>{profile
                    ?.bio}</h1>
            <h1>{profile
                    ?.location}</h1>
            <h1>{profile?.profilePic}</h1>
        </div>
    )

}

export default Profile;