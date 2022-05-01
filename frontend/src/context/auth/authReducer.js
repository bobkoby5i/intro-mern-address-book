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
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }
        case LOGIN_SUCCESS:
            console.log("writing local storage token in Reducer LOGIN_SUCCESS", action.payload.token)
            localStorage.setItem('intro-mern-address-book-token',action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                loading:false
            }
        case LOGOUT:
            localStorage.removeItem('intro-mern-address-book-token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user:null,
                error: null
            }               
        case LOGIN_FAIL:
            localStorage.removeItem('intro-mern-address-book-token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user:null,
                error: action.payload // msg from
            }            

        case REGISTER_SUCCESS:
            console.log("writing local storage token in Reducer REGISTER_SUCCESS", action.payload.token)
            localStorage.setItem('intro-mern-address-book-token',action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                loading:false
            }
        case REGISTER_FAIL:
            localStorage.removeItem('intro-mern-address-book-token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user:null,
                error: action.payload // msg from
            }
        case AUTH_ERROR:
            localStorage.removeItem('intro-mern-address-book-token');
            return {
                ...state,
                error: action.payload
            }
    
        case CLEAR_ERRORS:
        localStorage.removeItem('intro-mern-address-book-token');
        return {
            ...state,
            error:null
        }

                        
        
        default: 
            return state;
    }

}

export default fn;