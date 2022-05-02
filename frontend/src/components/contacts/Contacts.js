import React, { Fragment, useContext, useEffect} from "react";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem"
import Spinner from "../layout/Spinner";


import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Contacts = () => {
    const contactContext = useContext(ContactContext);
    console.log(contactContext);
    const { contacts, filtered, getContacts, loading, addContactArrOnly } = contactContext;
    console.log(contacts);

    console.log(contacts.length ," contacts")

  

    useEffect(()=>{
        getContacts();

        // eslint-disable-next-line
    }, [])

    if (contacts.length === 0) {
        return (<h4 className="text-primary">Please and a contact</h4>)
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
