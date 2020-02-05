import React, {useContext, useState} from "react"
import  {FirebaseContext} from "../store/Firebase"
import {Form, Checkbox, Button, Message} from "semantic-ui-react"
import {Redirect} from "react-router-dom"
import {connect} from "react-redux"
import {HOME, SIGNUP} from "../routing/routes"
import "./styles.css"
import { LoginSucess } from "../actions/authActions"


const Login = (props) => {
    console.log(props)
    const firebase = useContext(FirebaseContext);
    const [error,
        setError] = useState(null)
    return (
        <div className='login'>
            {props.login ? <Redirect to={HOME}/> : null}
            <div className='loginBox'>
                <h1>Welcome to DIO -- please Log In</h1>
                <div className='loginForm'>
                    <Form
                        onSubmit={(event) => handleLoginSubmit(event, firebase, setError, props.loginSuccess)}>
                        <Form.Field>
                            <label>Email</label>
                            <input required placeholder='Email'/>
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input required type='password' placeholder='Password'/>
                        </Form.Field>
                        <Form.Field>
                            <Checkbox label='Remeber Me'/>
                        </Form.Field>
                        <Button type='submit'>Submit</Button>
                    </Form>
                    {error
                        ? <Message negative>
                                <Message.Header>{error}!</Message.Header>
                            </Message>
                        : null}
                </div>
                <h3>Don't have an account?</h3>
                <br></br>
                <Button href={SIGNUP}>Create Account!</Button>
            </div>
        </div>
    )
}

const handleLoginSubmit = (event, firebase, setError, loginSuccess) => {
    event.preventDefault();
    const email = (event.target[0].value);
    const pass = (event.target[1].value);
    const remember = (event.target[2].value);

    if (remember) {
        firebase
            .doSetPersistanceSession()
            .then(() => {
                firebase
                    .doSignInWithEmailAndPassword(email, pass)
                    .then((user) => {
                        loginSuccess(user.user)
                    })
                    .catch((error) => setError("Error: " + error.message))
            })
    } else {
        firebase
            .doSetPersistanceLocal()
            .then(() => {
                firebase
                    .doSignInWithEmailAndPassword(email, pass)
                    .then((user) => {
                        loginSuccess(user.user)
                    })
                    .catch((error) => setError("Error: " + error.message))
            })
    }
}

const mapStateToProps = (state ) => {
    return {
        login: state.auth.login
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginSuccess: (user) => dispatch(LoginSucess(user))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);