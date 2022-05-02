import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import AuthContext from "../../context/auth/authContext";
import ContactContext from '../../context/contact/contactContext';

const Navbar = ({title, icon}) => {
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);
    const { isAuthenticated,  logout, user } = authContext;
    const { clearContacts } = contactContext;

    const onLogout =  (e) => {
        e.preventDefault();
        logout();
        clearContacts();
    }

    const authLinks = (
        <>
            {/* <li>Hello {user && user.name}</li> */}
            <li><a onClick={onLogout} href="#!">
                    <i className="fas fa-sign-out-alt"></i> <span className="hide-sm">Logout {user && "("+user.name+")"}</span>
                </a>
            </li>
        </>
    );

    const guestLinks = (
        <>
              <li>
                    <Link to='/register'>Register</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
        </>
    );    

    return(
        <div  className="navbar bg-primary">
            <h1>
                <i className={icon}/> 
                <Link to='/'>{title}</Link>
            </h1>
            <ul>
                <li>
                    <Link to='/contacts'>Contacts</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
                {isAuthenticated ? authLinks : guestLinks}
            </ul>
        </div>
    )
}


Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
}

Navbar.defaultProps = {
    title: 'Address Book',
    icon: 'fas fa-id-card-alt'
}

export default Navbar;