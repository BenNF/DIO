import React, {useContext, useState} from 'react'
import Firebase, {FirebaseContext} from "../store/Firebase"
import {connect} from "react-redux"
import {Link, Redirect} from "react-router-dom"
import {ACCOUNT} from "../routing/routes"
import {Button} from "semantic-ui-react"


const Home =(props) => {
    const firebase = useContext(FirebaseContext);

    return (
        <div className="home">
            {props.login ?
                <div>
                    <h1>This is home</h1>
                    <Link to={ACCOUNT}>
                        <Button>Go to account page!</Button>
                    </Link>
                </div>
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