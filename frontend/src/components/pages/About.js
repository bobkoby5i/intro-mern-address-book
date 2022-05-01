import React, {useState, useEffect} from 'react';

const REACT_APP_WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
console.log("API_KEY1:",REACT_APP_WEATHER_API_KEY)
const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';


const About = () => {
    const [ip, setIp] = useState("");
    const [backEndVersion, setBackEndVersion] = useState({ver:"",msg:""});



    useEffect( ()=> {
        fetch(`${REACT_APP_BACKEND_URL}/version`, {  method: 'GET' })
        .then(response => {
            console.log(response);
            if (response.ok)
                return response.json();
            else
                throw new Error('Błąd sieci!');
        })
        .then(data => {
            // console.log(data);
            setBackEndVersion(data);
        })   
        .catch(error => {console.error('wystapil blad local', error)})     

        fetch('https://api64.ipify.org/')
        .then(response =>response.text())
        .then(ip => {
            // console.log(ip);
            setIp(ip)
        }).catch(error => {console.error('wystapil blad', error)})
    },[]);    


    // console.log(backEndVersion.ver)

    return(
        <div>
         <h1>About this app</h1>
         <p>This is a fullstack React app for keeping contacts.</p>
         <p className="bk-dark p">
            <strong>Technology : </strong> MongoDB Atlas, Heroku, NodeJS API back-end, React with hooks front-end
         </p>
         <p className="bk-dark p">
             <strong>REACT_APP_BACKEND_URL API: </strong> {REACT_APP_BACKEND_URL} 
         </p>         
         <p className="bk-dark p">
             <strong>Front-end ver. : </strong> 1.0.0
         </p>
         <p className="bk-dark p">
             <strong>Back-end ver. : </strong> {backEndVersion.ver}
         </p>
         <p className="bk-dark p">
             <strong>Back-end info : </strong> {backEndVersion.msg}
         </p>
         <p className="bk-dark p">
             <strong>REACT_APP_WEATHER_API_KEY</strong> {REACT_APP_WEATHER_API_KEY}
         </p>
         <p className="bk-dark p">
             <strong>IP : </strong> {ip}
         </p>
        </div>
    )
}


export default About;