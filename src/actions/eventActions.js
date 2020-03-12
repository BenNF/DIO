export const createEvent = (event) => {
    return {
        type: "CREATE_EVENT",
        payload: event
    }
}

export const loadEvents = (events) => {
    return {
        type: "LOAD_EVENTS",
        payload: events
    }
}