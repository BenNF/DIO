import React, {useState, useEffect, useContext} from 'react'
import {Button, TextArea, Loader, Dimmer, Label, Segment, Image} from "semantic-ui-react"
import {connect} from "react-redux"
import {FirebaseContext} from "../store/Firebase"


const Event = (props) => {
    const uid = props.match.params?.id
    const [event, setEvent] = useState(null)
    const firebase = useContext(FirebaseContext)
    const [attendingData, setAttending] = useState([])

    useEffect(()=> {
        let eData = props.events.find(x => x.uid == uid)
        if(eData){
            setEvent(eData)
            setAttending(eData.attending)
        }
        else{
            firebase.doLoadSingleEvent(uid).then(data => {
                const event = {
                    ...data.data(),
                    uid
                }

                setEvent(event)
                setAttending(event.attending)
            })
        }
        
    }, [props.match.params])

    return (
        <div className="event">
            {event ? 
            <div className='eventData'>
                <h1>{event.name}</h1>
                <hr style={{width: "80%", border: "3px dotted #bbb"}}></hr>
                <img src={event.photo}></img>
                <div className = 'eventBottom'>
                    <div className='col'>
                        <Label>Description: </Label>
                        <TextArea style= {{resize: "none"}}value ={event.description}></TextArea>
                    </div>
                    <div className='col'>
                        <Label>When: </Label>
                        <Segment>{new Date(event.date.seconds * 1000).toDateString()} at {event.time}</Segment>
                        <hr style={{width: "80%", border: "3px dotted #bbb"}}></hr>

                        <Label>Where: </Label>
                        <Segment>{event.location}</Segment> {/*TODO eventually this could be a google maps pin  */}
                        <hr style={{width: "80%", border: "3px dotted #bbb"}}></hr>

                        <Label>Hosted By: </Label>
                        <Segment>{event.hostName} </Segment> {/*TODO eventually this could be a google maps pin  */}

                        
                    </div>
                    <div className='col'>
                        <Label>Attending</Label>
                        <Segment>
                            <ul>
                            {attendingData.map(attendingName => {
                                return (<li>{attendingName}</li>)
                            })}
                            </ul>
                        </Segment>
                        <Button onClick={() => {setAttending([...attendingData, props.profile.name])}}>Join!</Button>
                    </div>

                </div>
            </div>
            :
            <Dimmer active>
                <Loader></Loader>
            </Dimmer>
            }
            
        </div>
    )
}


const mapStateToProps = (state) => {
    return (
        {
            events: state.events.events,
            profile: state.auth.profile
        }
    )
}

const mapDispatchToProps = (dispatch) => {
    return (
        {}
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Event);