import React, { useState, useContext, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';


const Login = () => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();


    const {setAlert } = alertContext;
    const {login, error, clearErrors, isAuthenticated } = authContext;

  const   [user, setUser ] = useState({
      email: '', 
      password:'',
  })

  const {email, password} = user;

  const onChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  }

  useEffect(()=>{
    console.log("inside useEffect Login form..")
    if (isAuthenticated) {
        console.log("isAuthenticated:",isAuthenticated)
        navigate('/');
    }
    if (error !== null) {
      console.log("error:",error)
      setAlert(error, 'danger')   
      clearErrors();     
    }
    // complains about setAlert clearErrors
    // eslint-disable-next-line 
}, [error, isAuthenticated])  

  const onSubmit = e => {
      e.preventDefault();
      if (email === "" || password === "")  {
          console.log("Please enter all fields")
          setAlert("Please enter all fields", 'danger')
      } else {
        console.log('Submit login', user);
        login({
            email,
            password
        })
      }

  }

  return (
    <div className="form-container">
        <h1>
            Account <span className="text-primary">Login</span>
        </h1>
        <form onSubmit={onSubmit}>
            <div className='form-group'>
                <label htmlFor="email">Email address</label>
                <input type="email" name="email" value={email} onChange={onChange}/>
            </div>
            <div className='form-group'>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} onChange={onChange}/>
            </div>
            <input type="submit" value="Login" className="btn btn-primary btn-block"/>
        </form>

    </div>
  )
}

export default Login