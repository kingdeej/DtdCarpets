import React from 'react'
import { Redirect, Route } from 'react-router'



function ProtectedRoute({isAuth: IsAuth, component: Component, ...rest}) {
    const redirect = true
    return <Route {...rest} render={(props)=>{
        if (IsAuth) {
            
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
