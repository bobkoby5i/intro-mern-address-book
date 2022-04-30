import {
    ALERT_SET,
    ALERT_REMOVE,
} from'../types';


const fn = (state,action) => {
    switch(action.type) {
        case ALERT_SET:
            console.log([...state, action.payload])
            return [...state, action.payload]
        case ALERT_REMOVE:
            // return all except id
            return state.filter((alert) => alert.id !== action.payload) 
        default: 
        return state;
    }

}

export default fn;