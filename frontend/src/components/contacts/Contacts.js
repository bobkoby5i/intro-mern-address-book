import React, { Fragment, useContext, useEffect} from "react";
import ContactContext from "../../context/contact/contactContext";
import AlertContext from '../../context/alert/alertContext';
import ContactItem from "./ContactItem"
import Spinner from "../layout/Spinner";


import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const { error, contacts, filtered, getContacts, loading, addContactArrOnly, clearErrors } = contactContext;
    const alertContext = useContext(AlertContext);
    const {setAlert } = alertContext;


    console.log(contacts);
    console.log(contacts?.length ," contacts")

  

    useEffect(()=>{
        getContacts();

        // eslint-disable-next-line
    }, [])

    useEffect(()=>{
        if (error !== null) {
            console.log("error:",error)
            setAlert(error, 'danger')   
            clearErrors();     
          }
        // eslint-disable-next-line
    }, [error])




    if (contacts !== null) {
        if (contacts.length === 0) {
            return (<h4 className="text-primary">Please and a contact</h4>)
        }
    }

    // let displayed_contacts = [];

    // if (filtered !== null) {
    //     displayed_contacts = filtered.map((contact,index) => (
    //         <ContactItem key={contact.id} contact={contact}></ContactItem>
    //     ))
    // } else {
    //     displayed_contacts = contacts.map((contact,index) => (
    //         <ContactItem key={contact.id} contact={contact}></ContactItem>
    //     ))
    // }

    return (
        <Fragment>
            <h2 className="text-primary">Contacts</h2>
            {contacts !== null && !loading ? (
                <TransitionGroup>
                {filtered !== null
                    ? filtered.map((contact,index) => (
                    <CSSTransition key={contact._id} timeout={500} classNames="item">
                        <ContactItem contact={contact}></ContactItem>
                    </CSSTransition>
                    ))
                    : contacts.map((contact,index) => (
                        <CSSTransition key={contact._id} timeout={500} classNames="item">
                            <ContactItem contact={contact}></ContactItem>
                        </CSSTransition>
                    ))
                }
            </TransitionGroup>
            ) : <Spinner />} 
            

        </Fragment>
    )
}

export default Contacts;
