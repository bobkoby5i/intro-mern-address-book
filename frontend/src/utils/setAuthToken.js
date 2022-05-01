import axios from "axios";

// 
// add Authorization: Bearer eyJhbGciOiJIUzI1...
//

const setAuthToken = token => {
    if(token){
        //axios.defaults.headers.common['x-auth-token'] = token
        console.log("setAuthToken", token)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    } else {
        //delete axios.defaults.headers.common['x-auth-token'] 
        delete axios.defaults.headers.common['Authorization'] 
    }
}

export default setAuthToken;