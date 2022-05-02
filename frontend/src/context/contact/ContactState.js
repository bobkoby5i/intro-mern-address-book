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
    CONTACTS_CLEAR,
    CONTACTS_GET,
    CONTACTS_ERROR,
    CLEAR_ERRORS,
} from'../types';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';

const config_headers = {
    headers: {
        'Content-Type':'application/json'
    }
}


const guestContacts = [
    {
        "_id": 1,
        "name": "bob",
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
];  


const ContactState = props => {
    // const alertContext = useContext(AlertContext)
    // const {setAlert } = alertContext;

    const initialState = {
        contacts: [
            {
                "_id": 1,
                "name": "bob",
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
        // contact.id = uuidv4();
        console.log("ADD CONTACT()", contact);

        try {
            // add token to request call BE get user data. 
            const res = await axios.post(REACT_APP_BACKEND_URL + '/api/contacts', contact, config_headers);
            dispatch({type: CONTACT_ADD, payload: res.data });
            return res;
        } catch (error) {
            console.log("POST /api/contacts error")

            let message = typeof error.response !== "undefined" ? error.response.data.msg : error.message;
            console.log(error)
            console.log(message)
            if (error.response.status!==201) { 
                message = "user not created. error."
            }

            dispatch({
                type: CONTACTS_ERROR,
                //payload: "POST /api/contacts error"
                payload: message
            })        
        }
    }

    // Get Contacts
    const getContacts = async () => {
        console.log("GET CONTACTS():");

        try {
            const res = await axios.get(REACT_APP_BACKEND_URL + '/api/contacts');
            dispatch({type: CONTACTS_GET, payload: [...res.data] });
        } catch (error) {
            console.log("GET /api/contacts error")
            //dispatch({type: CONTACTS_GET, payload: [...guestContacts] });    
            dispatch({
                type: CONTACTS_ERROR,
                payload: "GET /api/contacts error"
                //payload: error.response.msg??"ERROR"
            })    
        }        
    }    


    // Contact Delete  
    const deleteContact = async (id) => {
        console.log("DELETE CONTACT():", id);

        try {
            await axios.delete(REACT_APP_BACKEND_URL + '/api/contacts/' + id);
            dispatch({type: CONTACT_DELETE, payload:id });
        } catch (error) {
            console.log("DELETE /api/contacts error")
            let message = typeof error.response !== "undefined" ? error.response.data.msg : error.message;
            console.log(error)
            console.log(message)
            if (error.response.status===409) { 
                dispatch({type: CONTACT_DELETE, payload:id });
                message = "This is demo/sample contact deleted from GUI not from DB"
            }
            //dispatch({type: CONTACTS_GET, payload: [...guestContacts] });    
            dispatch({
                type: CONTACTS_ERROR,
                payload: message
                //payload: error.response.msg??"ERROR"
            })    
        }   


        
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
    const updateContact = async (contact) => {
        

        try {
            // add token to request call BE get user data. 
            const res = await axios.put(`${REACT_APP_BACKEND_URL}/api/contacts/${contact._id}` , contact, config_headers);
            dispatch({ type:CONTACT_UPDATE, payload:res.data });
        } catch (error) {
            console.log("PUT /api/contacts error")
            //setAlert(error, 'danger')   
            //console.log(error.response.data.msg)
            dispatch({
                type: CONTACTS_ERROR,
                //payload: "POST /api/contacts error"
                payload: error.response.msg
            })        
        }        


    }    

    // Filter Contact
    const filterContacts = (text) => {
        dispatch({ type:FILTER_CONTACTS, payload:text });
    }    


    // Clear Filter
    const clearFilter = () => {
        dispatch({ type:FILTER_CLEAR });
    }    

    
    // Clear Filter
    const clearContacts = () => {
        dispatch({ type:CONTACTS_CLEAR });
    }    

    // populate SampleData 
    const addContactArrOnly = (contact) => {
        dispatch({type: CONTACT_ADD, payload: contact });
    }

    // Clear Errors
    const clearErrors = () => {
    console.log("Inside clearErrors")
        dispatch({
            type: CLEAR_ERRORS,
        })
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
                clearFilter,
                getContacts, 
                addContactArrOnly,
                clearContacts,
                clearErrors
            }}>
            { props.children }
        </ContactContext.Provider>
    );
}

export default ContactState; 