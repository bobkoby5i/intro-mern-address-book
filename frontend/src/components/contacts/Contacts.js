import React, { Fragment, useContext} from "react";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem"
// const contacts = [{name:"aa"},{name:"bb"}]

const Contacts = () => {
    const contactContext = useContext(ContactContext);
    console.log(contactContext);
    const { contacts } = contactContext;
    console.log(contacts);

    return (
        <Fragment>
            <h1>Contacts</h1>
                {
                    contacts.map((contact,index) => (
                    <ContactItem key={contact.id} contact={contact}></ContactItem>
                    ))
                }
        </Fragment>
    )
}

export default Contacts;
