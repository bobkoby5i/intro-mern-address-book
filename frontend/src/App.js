import React, { Fragment } from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home'
import About from './components/pages/About'
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from "./components/layout/Alerts"


import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

import './App.css';



const App = () => {

// load tokeninto global headers / interceptor Bearer
if (localStorage["intro-mern-address-book-token"]) {
  setAuthToken(localStorage["intro-mern-address-book-token"])
}



  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar></Navbar>
              <div className="container">
                <Alerts/>
                <Routes>
                  <Route exact path='/' element={<PrivateRoute component={Home}/>}></Route>
                  <Route exact path='/contacts' element={<PrivateRoute component={Home}/>}></Route>
                  <Route exact path='/about' element={<About/>} />
                  <Route exact path='/register' element={<Register/>} />
                  <Route exact path='/login' element={<Login/>} />
                </Routes>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
