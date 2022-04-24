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
        ],
        current: null,
        filtered: null
    }
    const [state, dispatch] = useReducer(ContactReducer, initialState);

    // Contact Add 
    const addContact = contact => {
        contact.id = uuidv4();
        console.log("ADD CONTACT()", contact);
        dispatch({type: CONTACT_ADD, payload:contact });
    }

    // Contact Delete  
    const deleteContact = id => {
        console.log("DELETE CONTACT():", id);
        dispatch({type: CONTACT_DELETE, payload:id });
    }    

    // Set Current Contact
    const setCurrent = contact => {
        console.log("inside setCurrent")
        dispatch({ type:CONTACT_CURRENT_SET, payload:contact });
    }

    // Clear Contact
    const clearCurrent = () => {
        dispatch({ type:CONTACT_CURRENT_CLEAR });
    }

    // Update Contact 
    const updateContact = (contact) => {
        dispatch({ type:CONTACT_UPDATE, payload:contact });
    }    

    // Filter Contact
    const filterContacts = (text) => {
        dispatch({ type:FILTER_CONTACTS, payload:text });
    }    


    // Clear Filter
    const clearFilter = () => {
        dispatch({ type:FILTER_CLEAR });
    }    

    return (
        <ContactContext.Provider 
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                addContact, 
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter
            }}>
            { props.children }
        </ContactContext.Provider>
    );
}

export default ContactState; 