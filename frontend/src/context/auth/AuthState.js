import React, { useEffect, useReducer } from "react";
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
        token: localStorage.getItem("intro-mern-address-book-token"),
        isAuthenticated: null,
        loading: true,
        error: null
    }
    const [state, dispatch] = useReducer(AuthReducer, initialState);


    useEffect(()=>{
        loadUser()
    }, [])  

// Load User
const loadUser = async () => {
    console.log("Inside Load User");
    
    // load tokeninto global headers / interceptor Bearer
    if (localStorage["intro-mern-address-book-token"]) {
        setAuthToken(localStorage["intro-mern-address-book-token"])
    } else {
        console.log("No token found in localStorage -> Register or Login first.")
        dispatch({
            type: LOGOUT, 
        })
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


        // in response form API we get {token}
        //TODO; shall I remove ti from here ? we have racing dispatch sets token & loadusers - needs token
        console.log("writing local storage token in Register()", res.data.token)
        localStorage.setItem('intro-mern-address-book-token',res.data.token);

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
const login = async (formData) => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }

    try {
        const res = await axios.post(REACT_APP_BACKEND_URL + '/api/auth', formData, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        console.log("writing local storage token in Register()", res.data.token)
        localStorage.setItem('intro-mern-address-book-token',res.data.token);
        loadUser();
    } catch (error) {
        console.log("login failed")
        console.log(error.response.data.msg)
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.msg
        })
        
    }
}    
    
// Logout 
const logout = () => {
    console.log("Inside logout")
    dispatch({
        type:LOGOUT,
    })
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