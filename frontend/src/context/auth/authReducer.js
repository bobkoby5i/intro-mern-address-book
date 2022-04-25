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


const fn = (state,action) => {
    switch(action.type) {
        case USER_LOADED:
            return {
                ...state,
                contacts: [...state.contacts, action.payload]
            }
        default: 
            return state;
    }

}

export default fn;