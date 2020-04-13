import React, {useState, useContext} from 'react'
import {
    Button,
    Form,
    Modal,
    TextArea,
    Image,
    Dimmer,
    Loader,
    Message,
    Icon
} from "semantic-ui-react"
import {connect} from "react-redux"
import {FirebaseContext} from "../store/Firebase"
import "react-datepicker/dist/react-datepicker.css";
import {createEvent} from "../actions/eventActions"
import DatePicker from "react-datepicker"
import LocationPicker from 'react-location-picker';
//TODO add location to this
//TODO add host to this
//TODO collect the ID and create event browser
const CreateEvent = (props) => {
    const [date,setDate] = useState(new Date())
    const [photo,setPhoto] = useState(null)
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [open,setOpen] = useState(false);
    const firebase = useContext(FirebaseContext);
    return (
        <Modal
            closeIcon={< Icon name = 'close' onClick = {
            () => setOpen(false)
        } > </Icon>}
            open={open}
            trigger={< Button onClick = {
            () => setOpen(true)
        } > Add Event </Button>}>
            <Modal.Header>
                <h1>Add an Event</h1>
            </Modal.Header>
            <Modal.Content>
                {loading
                    ? <Dimmer active>
                            <Loader/>
                        </Dimmer>
                    : null}
                <Form
                    onSubmit={(event) => {
                    setLoading(true);
                    handleSubmit(event, firebase, photo, date, props.profile).then((event) => {
                        props.createEventAction(event);
                        setPhoto(null);
                        setOpen(false);
                        setLoading(false);
                    }).catch(error => setError(error.message))
                }}>
                    <Form.Group widths='equal'>
                        <Form.Input required fluid label='Event Name' placeholder='Name'/>
                        <Form.Input required fluid label='Date'>
                            <DatePicker selected={date} onChange={(date) => setDate(date)}></DatePicker>
                        </Form.Input>
                        <Form.Input required label='Time' placeholder="10:00 AM"></Form.Input>
                        <Form.Input required label='Location' placeholder="123 Main Street Springfield USA"></Form.Input>
                    </Form.Group>
                    <Form.Input label='Description' required>
                        <TextArea></TextArea>
                    </Form.Input>
                    <Form.Input label='Event Image'>
                        <input
                            type='file'
                            accept="image/png, image/jpeg"
                            onChange={(event) => {
                            let fr = new FileReader()
                            if (event?.target?.files?.[0]) {
                                fr.readAsDataURL(event.target.files[0])
                            }
                            fr.onload = () => {
                                setPhoto(fr.result);
                            }
                        }}></input>
                    </Form.Input>
                    <Image src={photo} className='eventImage'></Image>
                    <Button type='submit'>Create Event!</Button>
                    {error
                        ? <Message>{error}</Message>
                        : null}
                </Form>
            </Modal.Content>
        </Modal>
    )
}
const handleSubmit = async(event, fb, photoString, date, profile) => {
    event.preventDefault();
    event.persist();
    let photo = '';
    if (photoString) {
        photo = await fb.doUploadImage(photoString, (new Date()).getTime().toString())
        photo = await photo
            .ref
            .getDownloadURL();
    }
    console.log(photo)
    const eventData = {
        name: event.target[0].value,
        date: date,
        time: event.target[2].value,
        location: event.target[3].value,
        description: event.target[4].value,
        photo: photo,
        hostName: profile.name,
        hostID: profile.uid,
        hostPhoto: profile.profilePic,
        attending: []
    }
    console.log(eventData)
    const id = await fb.doPushEvent(eventData)
    return eventData;
}

const mapStateToProps = (state) => {
    return {
        login: state.auth.login,
        profile: state.auth.profile,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createEventAction : (event) => dispatch(createEvent(event))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);