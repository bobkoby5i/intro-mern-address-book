import React, { useReducer } from "react";
import { v4 as uuidv4 } from 'uuid';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import {
    ALERT_SET,
    ALERT_REMOVE
} from'../types';



const AlertState = props => {
    const initialState = [];
    const [state, dispatch] = useReducer(AlertReducer, initialState);

// set Alert 
const setAlert = (msg, type, timeout=5000) => {
    console.log("inside set alert:",msg,type)
    const id = uuidv4();
    dispatch({ 
        type:ALERT_SET, 
        payload:{
            msg, 
            type, 
            id
        } 
    });
    // remove message after timeout
    setTimeout(() => {
        console.log("inside timeout remove alert", id)
        dispatch({type:ALERT_REMOVE, payload:id})},

    timeout); 
}   



    return (
        <AlertContext.Provider 
            value={{
                alerts: state,
                setAlert
            }}>
            { props.children }
        </AlertContext.Provider>
    );
}

export default AlertState; 