
const events = (state = {events: []}, action) => {
    switch(action.type){
        case 'CREATE_EVENT': return {events: [...state.events, action.payload]}
        case 'LOAD_EVENTS': return {events: action.payload}
        default: return state
    }
}

export default events;