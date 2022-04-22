import React, { useReducer } from "react";
import { v4 as uuidv4 } from 'uuid';
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
        contacts: [
                {
                    "id": 1,
                    "name": "bob1",
                    "email": "bob@gmail.com",
                    "phone": "111-111-111",                    
                    "type": "professional",
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
    const addContact = contact => {
        contact.id = uuidv4();
        console.log("HERE", contact)
        dispatch({type: CONTACT_ADD, payload:contact })
    }

    // Contact Delete  

    // Set Contact

    // Clear Contact

    // Update Contact 

    // Filter Contact

    // Clear Filter

    return (
        <ContactContext.Provider 
            value={{
                contacts: state.contacts,
                addContact
            }}>
            { props.children }
        </ContactContext.Provider>
    );
}

export default ContactState; 