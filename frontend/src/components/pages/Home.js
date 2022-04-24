import React from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilterForm from '../contacts/ContactFilterForm';

const Home = () => {
    return(
        <>
            <h1>Home</h1>
            <div className="grid-2">
            <div>
                <ContactForm/>
            </div>                   
            <div>
                <ContactFilterForm/>
                <Contacts/>
            </div>
            
            </div>
        </>
    )
}


export default Home;