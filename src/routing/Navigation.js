import React from "react"
import { Route, Switch } from "react-router-dom"
import {HOME, EVENT, PROFILE, LOGIN, SIGNUP,EDIT_ACCOUNT} from "./routes"
import Home from "../components/Home"
import Login from "../components/Login"
import SignUP from "../components/SignUp"
import Profile from "../components/Profile"
import EditAccount from "../components/EditAccount"
import Event from "../components/Event"

const Navigation = (props) => {
    return (
        <Switch>
            <Route exact path = {HOME} component ={Home}></Route>
            <Route exact path= {LOGIN} component = {Login}></Route>
            <Route exact path= {SIGNUP} component = {SignUP}></Route>
            <Route exact path= {EDIT_ACCOUNT} component = {EditAccount}></Route>
            <Route path = {PROFILE} component = {Profile}></Route>
            <Route path = {EVENT} component= {Event}></Route>
        </Switch>
    )
}

export default Navigation;