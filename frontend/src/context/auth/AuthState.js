import React, { useReducer } from "react";
import axios from "axios"
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import setAuthToken from "../../utils/setAuthToken";
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

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';

const AuthState = props => {
    const initialState = {
        user: null,
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        error: null
    }
    const [state, dispatch] = useReducer(AuthReducer, initialState);

// Load User
const loadUser = async () => {
    console.log("Inside Load User");
    
    // load tokeninto global headers / interceptor Bearer
    if (localStorage["intro-mern-address-book-token"]) {
        setAuthToken(localStorage["intro-mern-address-book-token"])
    }

    try {
        // add token to request call BE get user data. 
        const res = await axios.get(REACT_APP_BACKEND_URL + '/api/auth')
        dispatch({
            type: USER_LOADED, 
            payload: res.data
        })
    } catch (error) {
        console.log("error getting user")
        console.log(error.response.data.msg)
        dispatch({
            type: AUTH_ERROR,
            payload: error.response.data.msg
        })        
        
    }

}    


// Register User
const register = async (formData) => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }

    try {
        //usin proxy value from package josn 
        //TODO: move it to build and env.producion or env.varible 
        const res = await axios.post(REACT_APP_BACKEND_URL + '/api/users', formData, config);
        // in response form API we get {roken}
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        loadUser();
    } catch (error) {
        console.log("register failed")
        console.log(error.response.data.msg)
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data.msg
        })
        
    }

}

// Login User
const login = () => {
    console.log("Inside login")
}    
    
// Logout 
const logout = () => {
    console.log("Inside logout")
}    

// Clear Errors
const clearErrors = () => {
    console.log("Inside clearErrors")
    dispatch({
        type: CLEAR_ERRORS,
    })
}    

    return (
        <AuthContext.Provider 
            value={{
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                error: state.error,
                loadUser,
                register,
                login,
                logout,
                clearErrors
            }}>
            { props.children }
        </AuthContext.Provider>
    );
}

export default AuthState; 