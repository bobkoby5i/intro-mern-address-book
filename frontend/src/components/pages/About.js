import React from 'react';

const About = () => {
    const REACT_APP_WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    console.log("API_KEY1:",REACT_APP_WEATHER_API_KEY)

    return(
        <div>
         <h1>About this app</h1>
         <p>This is a fullstack React app for keeping contacts</p>
         <p className="bk-dark p">
             <strong>Version</strong> 1.0.0
         </p>
         <p className="bk-dark p">
             <strong>REACT_APP_WEATHER_API_KEY</strong> {REACT_APP_WEATHER_API_KEY}
         </p>
        </div>
    )
}


export default About;