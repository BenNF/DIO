import React, {useContext, useState} from "react"
import Firebase, {FirebaseContext} from "../store/Firebase"
import {Form, Checkbox, Button, Message, TextArea, Image} from "semantic-ui-react"
import {Redirect} from "react-router-dom"
import {connect} from "react-redux"
import {HOME, SIGNUP} from "../routing/routes"
import {LoginSuccess} from "../actions/authActions"
import "./styles.css"


// TODO fix bug firebase errors ignroed
// This includes when password size less than 6
// 
const SignUp = (props) => {
    const firebase = useContext(FirebaseContext);
    const [photo,setPhoto] = useState(null);
    const [error,
        setError] = useState(null)
    return (
        <div className='signUp'>
            {props.login ? <Redirect to={HOME}/> : null}
            <div className='signUpBox'>
                <h1>Welcome to DIO -- Please Create Your Account</h1>
                <div className='signUpForm'>
                    <Form
                        onSubmit={(event) => {
                            setError(null);
                            handleLoginSubmit(event, firebase, props.loginSuccess, photo)
                        }}>
                        <Form.Field>
                            <label>Email</label>
                            <input required placeholder='Email'/>
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input required type='password' placeholder='Password'/>
                        </Form.Field>
                        <Form.Field>
                            <label>Name</label>
                            <input required placeholder='Name...'/>
                        </Form.Field>
                        <Form.Field>
                            <label>Location</label>
                            <input required placeholder='City...'/>
                        </Form.Field>
                        <Form.Field>
                            <label>Bio</label>
                            <TextArea required placeholder='BIO'/>
                        </Form.Field>
                        <Form.Input label='Event Image'>
                            <input
                                type='file'
                                accept="image/png, image/jpeg"
                                onChange={(event) => {
                                let fr = new FileReader()
                                if (event?.target?.files?.[0]) {
                                    fr.readAsDataURL(event.target.files[0])
                                }
                                fr.onload = () => {
                                    setPhoto(fr.result);
                                }
                            }}></input>
                        </Form.Input>
                        <Image src={photo} className='eventImage'></Image>
                        <Button type='submit'>Submit</Button>
                    </Form>
                    {error
                        ? <Message negative>
                                <Message.Header>{error}!</Message.Header>
                            </Message>
                        : null}
                </div>
            </div>
        </div>
    )
}

const handleLoginSubmit = async (event, firebase, loginSuccess, photo) => {
    event.preventDefault();
    const email = (event.target[0].value);
    const pass = (event.target[1].value);
    const name = (event.target[2].value);
    const location = (event.target[3].value);
    const bio = (event.target[4].value);
   
    let profilePic = null;
    const user = await firebase.doCreateUserWithEmailAndPassword(email, pass)
    if(photo){
        profilePic = await firebase.doUploadImage(photo, user.user.uid);
        profilePic = await profilePic.ref.getDownloadURL();
    }
    const profile = {
        bio,
        name,
        location,
        email,
        profilePic,
        uid: user.user.uid,
    }
    await firebase.doSetUserProfile(user.user.uid, profile)
    console.log('sign up ')
    loginSuccess(user.user, profile);
}

const mapStateToProps = (state ) => {
    return {
        login: state.auth.login
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginSuccess: (user, profile) => dispatch(LoginSuccess(user,profile))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);