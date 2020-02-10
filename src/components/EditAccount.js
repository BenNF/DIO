import {SetProfile} from "../actions/authActions";
import React, {useContext, useState} from "react"
import {Form, Checkbox, Button, Message} from "semantic-ui-react"
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
                                <input placeholder='Email'/>
                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <input type='password' placeholder='Password'/>
                            </Form.Field>
                            <Form.Field>
                                <label>Name</label>
                                <input placeholder='Name...'/>
                            </Form.Field>
                            <Form.Field>
                                <label>Location</label>
                                <input placeholder='City...'/>
                            </Form.Field>
                            <Button type='submit'>Submit</Button>
                        </Form>
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