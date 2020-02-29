import React, {useState, useContext, useEffect} from 'react'
import {LoginSuccess} from "../actions/authActions"
import {Card, Button, Image, Icon} from "semantic-ui-react"
import {FirebaseContext} from "../store/Firebase"
import {connect} from "react-redux"
//RUDY owns this one

const Profile = (props) => {
    const firebase = useContext(FirebaseContext);
    const [profile,
        setProfile] = useState({});
    const userID = props.match
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
        <div className='profile'>
            <h1>Profile: </h1>
            <Card>
                <Image src={profile.profilePic} wrapped ui={false}/>
                <Card.Content>
                    <Card.Header>{profile.name}</Card.Header>
                    <Card.Description>
                        {profile.bio}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <a>
                        <Icon name='user'/>
                        10 events hosted
                    </a>
                </Card.Content>
            </Card>
        </div>
    )

}

export default Profile;