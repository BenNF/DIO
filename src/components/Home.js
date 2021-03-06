import React, {useContext, useState} from 'react'
import Firebase, {FirebaseContext} from "../store/Firebase"
import {connect} from "react-redux"
import {Link, Redirect} from "react-router-dom"
import {PROFILE, LOGIN} from "../routing/routes"
import {LogOut} from "../actions/authActions"
import {Button, TextArea} from "semantic-ui-react"
import CreateEvent from "./CreateEvent"
import EventBrowser from "./EventBrowser"

const Home = (props) => {
    //TODO map state into MENU instead of Home
    return (
        <div className="Home">
            <Menu login={props.login} logOut={props.logOut} profile={props.profile} title='DIO -- do it yourself'></Menu>
            <EventBrowser></EventBrowser>
        </div>
    )
}

const Menu = (props) => {
    const firebase = useContext(FirebaseContext);
    return (
        <div className='Menu'>
            <div className='menuHeader'>
                <h2>{props.title}</h2>
            </div>
            <div className='menuButtons'>
            {props.login
                ? <Link to={`/profiles/${props.profile.uid}`}>
                        <Button>Account</Button>
                    </Link>
                    // what does :null do? --Rich
                : null} 

            {props.login
                ? null
                : <Link to={LOGIN}>
                    <Button>Log In!</Button>
                </Link>}
            {props.login
                ? <Button
                        onClick={() => {
                        props.logOut();
                        firebase.doSignOut()
                    }}>Log Out!</Button>
                : null}
            {props.login
                ? <CreateEvent></CreateEvent>
                : null}
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
    return {
        logOut: () => dispatch(LogOut())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);