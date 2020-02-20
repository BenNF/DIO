import {SetProfile} from "../actions/authActions";
import React, {useContext, useState} from "react"
import {Form, Image, Button, Message, Input, TextArea} from "semantic-ui-react"
import {connect} from "react-redux"
import {FirebaseContext} from "../store/Firebase"
import {Redirect} from "react-router-dom"
import {LOGIN} from "../routing/routes"
import "./styles.css"

const Account = (props) => {
    const [photo, setPhoto] = useState(props.profile.profilePic)
    const [didUpdate, setUpdate] = useState(false);

    const firebase = useContext(FirebaseContext);
    return (
        <div>
            {props.login ? null : <Redirect to={LOGIN}/>}
            {didUpdate ? <h1>YAAAAY you updated your profile</h1> : null}
            <div className='editForm'>
                <div className='editFormbox'>
                    <h1>New Edits</h1>
                    <Form onSubmit={(event) => handleSubmit(event, firebase, photo, props.profile.uid, setUpdate)}>
                        <Form.Field>
                            <label>Bio</label>
                            <TextArea placeholder={props.profile.bio}/>
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
        </div>
    )
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
            firebase.doSetUserProfile(uid, profile).then(()=> {
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