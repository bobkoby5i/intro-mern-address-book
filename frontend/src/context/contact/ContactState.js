import React, { useReducer } from "react";
import uuid from 'uuid';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
    CONTACT_ADD,
    CONTACT_DELETE,
    CONTACT_UPDATE, 
    CONTACT_CURRENT_SET,
    CONTACT_CURRENT_CLEAR, 
    FILTER_CONTACTS,
    FILTER_CLEAR,
} from'../types';


const ContactState = props => {
    const initialState = {
        conatcts: [
                {
                    "id": 1,
                    "name": "bob",
                    "email": "bob@gmail.com",
                    "phone": "111-111-111",                    
                    "type": "personal",
                },
                {
                    "id": 2,
                    "name": "tom",
                    "email": "tom@gmail.com",
                    "phone": "222-222-111",
                    "type": "personal",
                },
                {
                    "id": 3,
                    "name": "alice",
                    "email": "alice@gmail.com",
                    "phone": "333-333-111",
                    "type": "personal",
                }
        ]
    }
    const [state, dispatch] = useReducer(ContactReducer, initialState);

    // Contact Add 

    // Contact Delete  

    // Set Contact

    // Clear Contact

    // Update Contact 

    // Filter Contact

    // Clear Filter

    return (
        <ContactContext.Provider 
            value={{
                contacts: state.contacts
            }}>
            { props.children }
        </ContactContext.Provider>
    );
}

export default ContactState; 