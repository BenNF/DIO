import {SetProfile} from "../actions/authActions";
import React, {useContext, useState, PureComponent} from "react"
import {Form, Image, Button, Input, TextArea} from "semantic-ui-react"
import {connect} from "react-redux"
import {FirebaseContext} from "../store/Firebase"
import {Redirect} from "react-router-dom"
import {LOGIN,PROFILE} from "../routing/routes"
// import PureComponent
import ReactDOM from "react-dom";
import ReactCrop from "react-image-crop";

import "./styles.css"


const Account = (props) => {
    const [photo, setPhoto] = useState(props.profile.profilePic)
    const [didUpdate, setUpdate] = useState(false);
    const [location, setLocation] = useState(props.profile.location)
    const [bio, setBio] = useState(props.profile.bio)
    const [name, setName] = useState(props.profile.name)
    const firebase = useContext(FirebaseContext);

    return (
        <div className='editProfile'>
            {props.login ? null : <Redirect to={LOGIN}/>}
            {didUpdate ? <Redirect to={"/profiles/"+props.profile.uid}/> : null}
            <div className='editFormbox'>
                <h1>New Edits</h1>
                <Form onSubmit={(event) => handleSubmit(event, name, location, photo,bio, firebase, props.profile.uid, setUpdate)}>
                    <Form.Field>
                        <label>Bio</label>
                        <TextArea value ={bio} onChange = {(event, value) => setBio(event.target.value)}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Name</label>
                        <input placeholder='Name...' value={name} onChange={(event,value) => setName(event.target.value)}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Location</label>
                        <input placeholder='City...' value={location} onChange={(event, value) => setLocation(event.target.value)}/>
                    </Form.Field>
                    <Form.Field>
                        <Image src={photo} size='small'></Image>
                        <Input>
                            <input type='file' accept="image/png, image/jpeg" onChange={(event) => {
                            let fr = new FileReader()
                            if(event?.target?.files?.[0]){
                                fr.readAsDataURL(event.target.files[0])
                            }

                            fr.onload = () => {
                                setPhoto(fr.result);
                            }
                        }}></input>
                        </Input>
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>
            </div>
        </div>
    )
}




const handleSubmit = (event, name, location, photo, bio, firebase, uid, setUpdate) => {
    event.preventDefault();
    console.log(event.target)
    console.log(photo)
    if(photo.substring(0,5) == "https"){
        const profile = {
            bio,
            name,
            location,
            profilePic: photo
        }
        firebase.doUpdateUserProfile(uid, profile).then(()=> {
            console.log("SUCCESS") //do something for user feedback here
            setUpdate(true)
        }).catch(error =>console.log(error))
    }
    else{
        firebase.doUploadImage(photo, uid).then(result => {
            result.ref.getDownloadURL().then(url => {
                const profile = {
                    bio,
                    name,
                    location,
                    profilePic: url
                }
                firebase.doUpdateUserProfile(uid, profile).then(()=> {
                    console.log("SUCCESS") //do something for user feedback here
                    setUpdate(true)
                }).catch(error =>console.log(error))
            }).catch(error => console.log(error))
        }).catch(error=> console.log(error))
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.auth.profile,
        login: state.auth.login
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setProfile: (profile) => dispatch(SetProfile(profile))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Account);