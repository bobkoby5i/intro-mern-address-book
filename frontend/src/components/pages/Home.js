import React, {useContext, useEffect} from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilterForm from '../contacts/ContactFilterForm';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
    const authContext = useContext(AuthContext);
    useEffect(()=>{
        authContext.loadUser();
        // eslint-disable-next-line
    }, [])
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