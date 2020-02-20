import {SetProfile} from "../actions/authActions";
import React, {useContext, useState} from "react"
import {Form, Image, Button, Message} from "semantic-ui-react"
import {connect} from "react-redux"
import "./styles.css"

const Account = (props) => {
    return (
        
        <body>
            <div className = 'editForm'>
                    <div className = 'editFormbox'>
                        <h1>New Edits</h1>
                        <Form>
                            <Form.Field>
                                <label>Email</label>
                                <input placeholder='Email' value = {props.profile.name}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <input type='password' placeholder='Password' value = {props.profile.password}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Name</label>
                                <input placeholder='Name...' value = {props.profile.name}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Location</label>
                                <input placeholder='City...' value = {props.profile.location}/>
                            </Form.Field>
                            <Button type='submit'>Submit</Button>
                        </Form>
                    </div>
            </div>
            <br/>
            <div className = 'center'>
                <div className = 'centerBox'>
                    <Image
                    src = "https://www.demilked.com/magazine/wp-content/uploads/2018/03/5aaa1cc36581b-funny-weird-wtf-stock-photos-7-5a391ad5a43f9__700.jpg"
                    size = "medium"
                    circular
                    />
                    <br/>
                    <Button>Change Image</Button>
                </div>
            </div>
        </body>
    )
}

const mapStateToProps = (state) => {
    return {
        profile: state.auth.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        setProfile: (profile) => dispatch(SetProfile(profile))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Account);