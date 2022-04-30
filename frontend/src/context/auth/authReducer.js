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
        case REGISTER_SUCCESS:
            localStorage.setItem('intro-mern-address-book-token',action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                loading:false
            }
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user:null,
                error: action.payload
            }
        case CLEAR_ERRORS:
            localStorage.removeItem('token');
            return {
                ...state,
                error:null
            }
        
        default: 
            return state;
    }

}

export default fn;