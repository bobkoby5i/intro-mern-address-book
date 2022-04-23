import React, {useState, useContext, useEffect } from "react";
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const { deleteContact, setCurrent, clearCurrent,addContact, updateContact, current } = contactContext;
    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    const {name, email, phone, type} = contact;

    const  onChange = (e) => setContact({...contact, [e.target.name]: e.target.value}); // take current state contact and apply value
    const clearAll = () => {
        // console.log(e.target)
        clearCurrent()
    }

    useEffect( ()=> {
        if (current !== null) {
            console.log("inside useEffect", current)
            setContact(current);
        } else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'            
            })
        }
    },[contactContext, current ]);       


    const onSubmit = (e) => {
        e.preventDefault();
        if (current === null){
            addContact(contact);    
        } else {
            updateContact(contact);
            //clearCurrent(); // maybe not needed? 
        }
        clearAll()

    }
    

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{(current !==null) ? "Edit contact" : "Add contact"}</h2>
            <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} />
            <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} />
            <input type="text" placeholder="Phone" name="phone" value={phone} onChange={onChange} />
            <h5>Contact Type</h5>
            <input type="radio" name="type" value="personal" checked={type === "personal"} onChange={onChange} ></input>{' '}Personal{' '}
            <input type="radio" name="type" value="professional" checked={type !== "personal"} onChange={onChange} ></input>{' '}Professional{' '}
            <div>
                <input type="submit" value={(current !==null) ? "Update contact" : "Add contact"} className="btn btn-primary btn-block"/>
            </div>
            {current && <div><button className="btn btn-light btn-block" onClick={clearAll}>Clear</button></div>}


        </form>
    )
}

export default ContactForm



