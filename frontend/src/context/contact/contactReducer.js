import {
    CONTACT_ADD,
    CONTACT_DELETE,
    CONTACT_UPDATE, 
    CONTACT_CURRENT_SET,
    CONTACT_CURRENT_CLEAR, 
    FILTER_CONTACTS,
    FILTER_CLEAR,
    ADD_ERROR,
} from'../types';

const fn = (state,action) => {
    switch(action.type) {
        case CONTACT_ADD:
            return {
                ...state,
                contacts: [...state.contacts, action.payload]
            }
        case CONTACT_UPDATE:
            console.log("inside contactReducer update", action.payload)
            
            return {
                ...state,
                //contacts: [...state.contacts.filter((contact) => contact.id!==action.payload.id ), action.payload]
                // ponizej troche sprytniej i nie zmienia kolejnosci
                contacts: state.contacts.map((contact,index) => {
                    return contact._id === action.payload._id ?  action.payload : contact
                })
            }
        case CONTACT_DELETE:
            return {
                ...state,
                contacts: state.contacts.filter((contact) => contact._id!==action.payload )
            }
        case CONTACT_CURRENT_SET:
            console.log("inside contactReducer", action.payload)
           
            return {
                ...state,
                current: action.payload
            }
        case CONTACT_CURRENT_CLEAR:
            return {
                ...state,
                current: null
            }
        case FILTER_CONTACTS:
            console.log("filter contacts. payload:", action.payload)
            return {
                ...state,
                filtered: state.contacts.filter((contact) => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return contact.name.match(regex) || contact.email.match(regex);
                })
            }
        case FILTER_CLEAR:
            return {
                ...state,
                filtered: null
            }
        case ADD_ERROR:
            console.log("contactReducer: ADD_ERROR ", action.payload)
            return {
                ...state,
                error: action.payload
            }

        
        default: 
            return state;
    }

}

export default fn;