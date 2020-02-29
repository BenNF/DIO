import React, {useEffect, useContext} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from "./routing/Navigation";
import './App.css';
import {LoginSuccess } from "./actions/authActions"
import {FirebaseContext} from "./store/Firebase"
import {connect} from "react-redux"

const App = (props) => {
  const firebase = useContext(FirebaseContext);
  firebase.doSetAuthListener((user) => authCallback(user, firebase, props.loginSuccess));

  return (
    <div className="App">
      <Router>
        <Navigation></Navigation>
      </Router>
    </div>
  );
}

const authCallback = (user, firebase, loginSuccess) => {
  const uid = user.uid   
  firebase.doLoadUserProfile(uid).then((doc) => {
      const profile = {
          ...doc.data(),
          uid: uid
      }
      console.log("profile", profile)
      loginSuccess(user, profile)
  })
}

const mapStateToProps = (state) => {
  return {

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loginSuccess: (user, profile) => dispatch(LoginSuccess(user, profile))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
