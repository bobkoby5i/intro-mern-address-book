import React, { Fragment, useContext} from "react";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem"
// const contacts = [{name:"aa"},{name:"bb"}]

const Contacts = () => {
    const contactContext = useContext(ContactContext);
    console.log(contactContext);
    const { contacts, filtered } = contactContext;
    console.log(contacts);

    console.log(contacts.length ," contacts")

    if (contacts.length === 0) {
        return (<h4 className="text-primary">Please and a contact</h4>)
    }


    let displayed_contacts = [];

    if (filtered !== null) {
        displayed_contacts = filtered.map((contact,index) => (
            <ContactItem key={contact.id} contact={contact}></ContactItem>
        ))
    } else {
        displayed_contacts = contacts.map((contact,index) => (
            <ContactItem key={contact.id} contact={contact}></ContactItem>
        ))
    }

    return (
        <Fragment>
            <h2 className="text-primary">Contacts</h2>
            {displayed_contacts}
        </Fragment>
    )
}

export default Contacts;
