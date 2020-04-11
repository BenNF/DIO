import {SetProfile} from "../actions/authActions";
import React, {useContext, useState, PureComponent} from "react"
import {Form, Image, Button, Input, TextArea} from "semantic-ui-react"
import {connect} from "react-redux"
import {FirebaseContext} from "../store/Firebase"
import {Redirect} from "react-router-dom"
import {LOGIN,PROFILE} from "../routing/routes"
import ReactDOM from "react-dom";
import ReactCrop from "react-image-crop";
import 'react-image-crop/dist/ReactCrop.css';
import "./styles.css"
import {CropImage} from "./ImageCrop"



const Account = (props) => {
    const [photo, setPhoto] = useState(props.profile.profilePic);
    const [didUpdate, setUpdate] = useState(false);
    const [bio, setBio] = useState(props.profile.bio);
    const firebase = useContext(FirebaseContext);
    // const []
    const [crop,cropSetter] = useState({
        aspect: 1/1
    });



    return(
        <div className='editProfile'>

        {props.login ? null : <Redirect to={LOGIN}/>}
        {didUpdate ? <Redirect to={PROFILE}/> : null}
        <div className='editFormbox'>
            <h1>New Edits</h1>
            <Form onSubmit={(event) => handleSubmit(event, firebase, photo, props.profile.uid, setUpdate)}>
                <Form.Field>
                    <label>Bio</label>
                    <TextArea value ={bio} onChange = {(event, value) => setBio(event.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Name</label>
                    <input placeholder='Name...' value={props.profile.name}/>
                </Form.Field>
                <Form.Field>
                    <label>Location</label>
                    <input placeholder='City...' value={props.profile.location}/>
                </Form.Field>
                <Form.Field>
                    <div>
                        <Image src={photo} size='small'></Image>
                    </div>
                    {/* I need an onClick for CropImage. Pass the setter function into CropImage */}
                    <CropImage photo = {photo} setPhoto = {setPhoto}></CropImage> {/*custom modal here*/}
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        </div>
    </div>
    )
    
    
}

const handleImageLoaded = (image) =>{
    console.log(image)
}

const handleOnCropComplete = (crop, pixelCrop) => {
     console.log(crop,pixelCrop)
}

const handleSubmit = (event, firebase, photo, uid, setUpdate) => {
    event.preventDefault();
    console.log(event.target)
    const bio = (event.target[0].value);
    const name = (event.target[1].value);
    const location = (event.target[2].value);
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