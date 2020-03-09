import React, {useState, useContext, useEffect} from 'react'
import {LoginSuccess} from "../actions/authActions"
import {Card, Button, Image, Icon, TextArea, Form, Label} from "semantic-ui-react"
import {FirebaseContext} from "../store/Firebase"
import {connect} from "react-redux"
import {Link }from "react-router-dom"
import { EDIT_ACCOUNT,HOME } from '../routing/routes'
//RUDY owns this one

const Profile = (props) => {
    const firebase = useContext(FirebaseContext);
    const [profile,
        setProfile] = useState(props.profile);
    const [edit, setEdit] = useState(false);
    const userID = props.match?.params.id

    useEffect(() => {
        console.log(props, userID)
        if (userID) {
            if(userID !== props.profile.uid){
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
            else{
                setProfile(props.profile)
                setEdit(true);
            }
        }
    }, [props.login])

    return (
        // When you refresh your profile page, the options to edit the account disappear 
        <div className='profile'>
            <ProfileMenu edit={edit}></ProfileMenu>
            <div className='profileContent'>
                <div className='profileLeft'> 
                    <Image className='profileImage' src={profile.profilePic}></Image>
                    <span style={{fontWeight: "bold"}}>{profile.name}</span>
                </div>
                <div className='profileRight'>
                    <Form className='profileBio'>
                        {/* TODO make this not dragable */}
                            <Label>Bio</Label>
                            <TextArea value={profile.bio}></TextArea>
                    </Form>
                    <div className='profileEvents'>
                        <div className='eventList'>
                            <h3> Recent Hosted Events:</h3>

                        </div>
                        <div className='eventList'>
                            <h3>Recent Joined Events</h3>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ProfileMenu = (props) => {
    return  (
        <div className='Menu'>

            <div className='menuHeader'>
                <h3>Profile</h3>
            </div>
            <div className='menuButtons'>
                <Link to={HOME}>
                    <Button>Home</Button>
                </Link>
                {props.edit ? <Link to={EDIT_ACCOUNT}><Button>Edit Account</Button></Link> : null}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        login: state.auth.login,
        profile: state.auth.profile
    }
}
const mapDispatchToProps = (dispatch) => {
    return{}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);