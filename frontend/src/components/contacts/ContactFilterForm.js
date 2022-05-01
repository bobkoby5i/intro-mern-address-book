import React, {useContext, useEffect, useRef } from "react";
import ContactContext from '../../context/contact/contactContext';

const ContactFilterForm = () => {
    const contactContext = useContext(ContactContext);
    const { filterContacts, clearFilter, filtered } = contactContext;
    // const [searchText, setSearchText] = useState(null);
    const text = useRef('');

    const  onChange = (e) => {
        //setSearchText(e.target.value); // take curent text apply to state
        if (text.current.value !== ''){
            filterContacts(e.target.value);
        } else {
            clearFilter();
        }
    }

    useEffect( ()=> {
        console.log("inside contactFilterForm useEffect", text)
        if (filtered === null) {
            text.current.value = '';
            // setContact(current);
        } 
    });       



    const clearAll = () => {
        console.log("in Submit")
        text.current.value = '';
        clearFilter();
        // clearCurrent()
    }


    const onSubmit = (e) => {
        console.log("in Submit")
        e.preventDefault();
    }
    

    console.log("text value:",text.current, )
    const clear_button_className = ((text.current === "") || (text.current.value !== "")) ? "btn btn-primary btn-block" : "btn btn-light btn-block";
    console.log(clear_button_className )


    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">Filter contacts</h2>
            
            <input ref ={text} type="text" placeholder="Filter Contacts (email or name)..." onChange={onChange} />
            {/* <input type="text" placeholder="Enter text" name="searchText" value={searchText} onChange={onChange} /> */}
            {/* <div>
                <input type="submit" value="Filter contacts" className="btn btn-primary btn-block"/>
            </div> */}
            <div><button className={clear_button_className} onClick={clearAll}>Clear</button></div>
        </form>
    )
}

export default ContactFilterForm



