import React from 'react'
import { Redirect, Route } from 'react-router'

function ProtectedRoute({ isAdmin: IsAdmin, component: Component, ...rest}) {
    const redirect = true
    return <Route {...rest} render={(props)=>{
        if (IsAdmin) {
            return <Component/>
        }else{
            if (redirect) {
                return <Redirect push to ="/"/>             
            }
        }
    }}
    />
}

export default ProtectedRoute
