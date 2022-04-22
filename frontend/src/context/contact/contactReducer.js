import {
    CONTACT_ADD,
    CONTACT_DELETE,
    CONTACT_UPDATE, 
    CONTACT_CURRENT_SET,
    CONTACT_CURRENT_CLEAR, 
    FILTER_CONTACTS,
    FILTER_CLEAR,
} from'../types';

const fn = (state,action) => {
    switch(action.type) {
        case CONTACT_ADD:
            return {
                ...state,
                contacts: [...state.contacts, action.payload]
            }
        default: 
            return state;
    }

}

export default fn;