import React, {useContext, useState} from "react"
import Firebase, {FirebaseContext} from "../store/Firebase"
import {Form, Checkbox, Button, Message, TextArea} from "semantic-ui-react"
import {Redirect} from "react-router-dom"
import {connect} from "react-redux"
import {HOME, SIGNUP} from "../routing/routes"
import {LoginSuccess} from "../actions/authActions"
import "./styles.css"

const SignUp = (props) => {
    const firebase = useContext(FirebaseContext);
    console.log(props)
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
                            handleLoginSubmit(event, firebase, setError, props.loginSuccess)
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

const handleLoginSubmit = (event, firebase, setError, loginSuccess) => {
    event.preventDefault();
    const email = (event.target[0].value);
    const pass = (event.target[1].value);
    const name = (event.target[2].value);
    const location = (event.target[3].value);
    const bio = (event.target[4].value);
    const profile = {
        bio,
        name,
        location,
        email,
        profilePic: null
    }
    
    firebase.doCreateUserWithEmailAndPassword(email, pass).then( (user) => {
        firebase.doSetUserProfile(user.user.uid, profile).then(()=> {
            loginSuccess(user.user);
        }).catch(error => console.log(error))
    }).catch(error => {
        setError("Error " + error.message)
    })   
}

const mapStateToProps = (state ) => {
    return {
        login: state.auth.login
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginSuccess: (user) => dispatch(LoginSuccess(user))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);