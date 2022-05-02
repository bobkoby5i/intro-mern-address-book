import React, { useReducer } from "react";
import axios from "axios"
import { v4 as uuidv4 } from 'uuid';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import AlertContext from '../../context/alert/alertContext';
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

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';



const ContactState = props => {
    // const alertContext = useContext(AlertContext)
    // const {setAlert } = alertContext;

    const initialState = {
        contacts: [
                {
                    "_id": 1,
                    "name": "bob1",
                    "email": "bob@gmail.com",
                    "phone": "111-111-111",                    
                    "type": "professional",
                },
                {
                    "_id": 2,
                    "name": "tom",
                    "email": "tom@gmail.com",
                    "phone": "222-222-111",
                    "type": "personal",
                },
                {
                    "_id": 3,
                    "name": "alice",
                    "email": "alice@gmail.com",
                    "phone": "333-333-111",
                    "type": "personal",
                }
        ],
        current: null,
        filtered: null,
        error: null
    }
    const [state, dispatch] = useReducer(ContactReducer, initialState);

    // Contact Add 
    const addContact = async (contact) => {
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }

        // contact.id = uuidv4();
        console.log("ADD CONTACT()", contact);

        try {
            // add token to request call BE get user data. 
            const res = await axios.post(REACT_APP_BACKEND_URL + '/api/contacts', contact, config);
            dispatch({type: CONTACT_ADD, payload: res.data });
        } catch (error) {
            console.log("POST /api/contacts error")
            //setAlert(error, 'danger')   
            //console.log(error.response.data.msg)
            dispatch({
                type: ADD_ERROR,
                //payload: "POST /api/contacts error"
                payload: error.response.msg
            })        
        }
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
                error: state.error,
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