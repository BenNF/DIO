import React, {useState, useContext, useEffect} from "react"
import {connect} from "react-redux"
import {Dimmer, Loader, Card, Pagination, Image} from "semantic-ui-react"
import {loadEvents} from "../actions/eventActions"
import {FirebaseContext} from "../store/Firebase"

const EventBrowser = (props) => {
    const firebase = useContext(FirebaseContext);
    const [page,setPage] = useState(1);
    useEffect(() => {
        if (props.events.length === 0) {
            firebase
                .doLoadAllEvents()
                .then((events) => {
                    props.loadEventsAction(events.docs.map((x) => {return {...x.data(),uid: x.id }}));
                })
        }
    }, [])
    return (
        <div className='events'>
            <h1>Check out some Events Near you!</h1>
            <div className='eventBrowserGrid'>

                {props.events.length === 0
                    ? <Dimmer active>
                            <Loader></Loader>
                        </Dimmer>
                    :
                    props.events.slice(12 * (page-1), 12 * page).map((e, index) => {
                        return <EventCard event={e} key={index}></EventCard>
                    })}
            </div>
            <Pagination activePage={page} 
            totalPages={Math.max(1, props.events.length / 12)}
            onPageChange={(e, {activePage}) =>  setPage(activePage)}></Pagination>
        </div>
    )
}

const EventCard = ({event}) => {
    return (
        <div className='eventGridItem'>
            <Card>
                <Image className ='eventImage' src={event.photo}></Image>
                <Card.Content>
                    <Card.Header>{event.name}</Card.Header>
                    <Card.Meta>
                        <span className='date'>{new Date(event.date.seconds * 1000).toDateString()} at {event.time}</span>
                    </Card.Meta>
                    <Card.Description>
                        {event.description.slice(0, 100)}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    {event.location}
                </Card.Content>
            </Card>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {events: state.events.events}
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadEventsAction: (events) => dispatch(loadEvents(events))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventBrowser);