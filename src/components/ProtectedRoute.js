import React from 'react'
import { Redirect, Route } from 'react-router'
import Cookies from 'universal-cookie';

function ProtectedRoute({component: Component, ...rest}) {
    const redirect = true
    return <Route {...rest} render={(props)=>{
        const cookies = new Cookies()
        if (cookies.get('isAuth') === 'true') {
            return <Component/>    
        }
        else{
            if (redirect) {
                return <Redirect push to ='/' />
            }
        }
    }} 
    />
}

export default ProtectedRoute
