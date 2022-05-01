import React, {Fragment, useContext} from 'react'
import { Route } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext'

import { Navigate } from "react-router-dom";


const PrivateRoute = ({component: Component, props}) => {
    const authContext = useContext(AuthContext)
    const { isAuthenticated, loading} = authContext;

    // const nieLogged =  (!isAthenticated && !loading) 
    if (isAuthenticated)  {
      console.log("show Home")
      return <Component {...props}/>
    } else {
      console.log("return Navigate to login page")
      return <Navigate to='/login' />
    }

  // return (
  //     <Fragment
  //       {...rest} 
  //       render = {props => 
  //         (!isAthenticated && !loading) 
  //         ? <Navigate to='/login' />
  //         : <Component {...props}></Component> 
  //       }
  //     />
  // );
};


export default PrivateRoute;