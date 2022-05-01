import React, {Fragment, useContext} from 'react'
import { Route } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext'

import { Navigate } from "react-router-dom";


const PrivateRoute = ({component: Component, props}) => {
    const authContext = useContext(AuthContext)
    const { isAuthenticated, loading} = authContext;

    // const nieLogged =  (!isAthenticated && !loading) 
    if (!isAuthenticated && !loading) {
      console.log("return Navigate to lofin")
      return <Navigate to='/login' />
    } else {
      console.log("show HOme")
      return <Component {...props}/>
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