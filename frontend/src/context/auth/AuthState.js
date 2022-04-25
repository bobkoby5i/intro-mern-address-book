import React, { useReducer } from "react";
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED, 
    AUTH_ERROR,
    LOGIN_SUCCESS, 
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from'../types';



const AurhState = props => {
    const initialState = {
        user: null,
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        error: null
    }
    const [state, dispatch] = useReducer(AuthReducer, initialState);

// Load User
const loadUser = (contact) => {
    dispatch({ type:USER_LOADED, payload:contact });
}    
// Register User
// Login User
// Logout 
// Clear Errors

    return (
        <AuthContext.Provider 
            value={{
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                error: state.error,
                loadUser
            }}>
            { props.children }
        </AuthContext.Provider>
    );
}

export default AurhState; 