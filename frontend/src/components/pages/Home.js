import React from 'react';
import Contacts from '../contacts/Contacts';

const Home = () => {
    return(
        <>
            <h1>Home</h1>
            <div>
                    Contact form to be here.
            </div>            
            <div className="grid-2">
                <div>
                    <Contacts/>
                </div>
            
            </div>
        </>
    )
}


export default Home;