import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import profile from '../images/profile.png';
import email from '../images/email.png';
import feedback from '../images/feedback.png';
import deletes from '../images/delete.png';
export class AdminPage extends Component {
    state = {
        redirect: false,
        customers: false,
        reviews: false,
        email: false,
    }
    dashNav = (e) => {
        const id = e.target.id
        this.setState({redirect: true})
        this.setState({[id]: true})
    }

    render() {
        if (this.state.redirect) {
            if (this.state.customers) {
                return <Redirect push to="/admin/customers" /> 
            }
            if (this.state.reviews) {
                return <Redirect push to="/admin/reviews" /> 
            }
            if (this.state.email) {
                return <Redirect push to="/admin/addEmail" /> 
            }
            
        }
        return (
            <div className='admin-main'>
                <ul>
                    <li id='customers' htmlFor=""  onClick={this.dashNav}>
                        <div id='customers'>
                            <img src={profile} alt="" id='customers'/>
                            <h2 id='customers'>CUSTOMERS</h2> 
                        </div>
                    </li>
                    <li id='reviews' htmlFor=""  onClick={this.dashNav}>
                        <div id='reviews' onClick={this.dashNav} id='reviews'>
                            <img src={feedback} alt="" />
                            <h2 id='reviews'>REVIEWS</h2> 
                        </div>
                    </li>
                    <li id='email' htmlFor=""  onClick={this.dashNav}>
                        <div id='email' onClick={this.dashNav}>
                            <img src={email} alt="" id='email'/>
                            <h2 id='email'>EMAIL</h2> 
                        </div>
                    </li>                    
                    <li id='deletes' htmlFor=""  onClick={this.dashNav}>
                        <div id='deletes' onClick={this.dashNav}>
                            <img src={deletes} alt="" id='deletes'/>
                            <h2 id='deletes'>DELETE</h2> 
                        </div>
                    </li>                    
                </ul>
            </div>
        )
    }
}

export default AdminPage

