import React, {useContext, useState} from 'react'
import Firebase, {FirebaseContext} from "../store/Firebase"
import {connect} from "react-redux"
import {Route, Redirect} from "react-router-dom"


const Home =(props) => {
    const firebase = useContext(FirebaseContext);

    return (
        <div className="home">
            {props.login ?
                <h1>This is home</h1>
            
            :
            <Redirect to='/login'></Redirect>}
        </div>
    )
}



const mapStateToProps = (state ) => {
    return {
        login: state.auth.login
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);