import React, {useState, useContext, useEffect} from 'react'
import {LoginSuccess} from "../actions/authActions"
import {Card, Button, Image, Icon, TextArea, Form} from "semantic-ui-react"
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
    const userID = props.match
        ?.params.id

    useEffect(() => {
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
    }, [])

    return (
        // When you refresh your profile page, the options to edit the account disappear 
        <React.Fragment>
            <h1>Profile: </h1>
            <Link to={HOME}><Button>Home</Button> </Link> 
            {edit ? <Link to={EDIT_ACCOUNT}><Button>Edit Account</Button></Link>: null}
            {/* {edit ? : null} */}
            <div className='profile'>
                <div className='profileLeft'> 
                    <Image className='profileImage' src={profile.profilePic}></Image>
                    <span style={{fontWeight: "bold"}}>{profile.name}</span>
                </div>
                <div className='profileRight'>
                    <Form className='profileBio'>
                        {/* TODO make this not dragable */}
                        <TextArea value={profile.bio}></TextArea>
                    </Form>
                </div>
            </div>
        </React.Fragment>
    )

}

const mapStateToProps = (state) => {
    return {
        profile: state.auth.profile
    }
}
const mapDispatchToProps = (dispatch) => {
    return{}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);