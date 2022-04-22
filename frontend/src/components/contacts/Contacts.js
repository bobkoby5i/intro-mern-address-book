import React, { Fragment, useContext} from "react";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem"
// const contacts = [{name:"aa"},{name:"bb"}]

const Contacts = () => {
    const contactContext = useContext(ContactContext);
    console.log(contactContext);
    const { contacts } = contactContext;
    console.log(contacts);

    if (contacts.length === 0) {
        return (<>
        <h2>Contacts</h2>
        <p>0 contacts</p>
        </>)
    }

    return (
        <Fragment>
            <h2>Contacts</h2>
                {
                    contacts.map((contact,index) => (
                    <ContactItem key={contact.id} contact={contact}></ContactItem>
                ))
                }
        </Fragment>
    )
}

export default Contacts;
