import React from "react"
import { Route, Switch } from "react-router-dom"
import {HOME, ACCOUNT, EVENT, PROFILE, LOGIN, SIGNUP} from "./routes"
import Home from "../components/Home"
import Login from "../components/Login"
import SignUP from "../components/SignUp"
import Profile from "../components/Profile"

const Navigation = (props) => {
    return (
        <Switch>
            <Route exact path = {HOME} component ={Home}></Route>
            <Route exact path= {LOGIN} component = {Login}></Route>
            <Route exact path= {SIGNUP} component = {SignUP}></Route>
            <Route exactpath= {ACCOUNT} component = {Profile}></Route>
        </Switch>
    )
}

export default Navigation;