import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import profile from '../images/profile.png';
import email from '../images/email.png';
import feedback from '../images/feedback.png';
import home from '../images/home.png';
import logout from '../images/logout.png';
export class AdminPage extends Component {
    state = {
        redirect: false,
        customers: false,
        reviews: false,
        email: false,
        home: false,
        logout: false,
    }
    dashNav = (e) => {
        const id = e.target.id
        this.setState({redirect: true})
        this.setState({[id]: true})
        if (id === "logout") {
            sessionStorage.clear()
        }
    }
    
    componentWillUnmount(){
        if (!this.state.redirect || this.state.home || this.state.logout) {
            localStorage.clear()
        }
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
            if (this.state.home || this.state.logout) {
                return <Redirect push to="/" /> 
            }
            
        }
        return (
            <div className='admin-main'>
                <ul>
                    <li id='customers' htmlFor="customers"  onClick={this.dashNav}>
                        <div id='customers'>
                            <img src={profile} alt="" id='customers'/>
                            <h2 id='customers'>CUSTOMERS</h2> 
                        </div>
                    </li>
                    <li id='reviews' htmlFor="reviews"  onClick={this.dashNav}>
                        <div id='reviews' onClick={this.dashNav}>
                            <img src={feedback} alt="" />
                            <h2 id='reviews'>REVIEWS</h2> 
                        </div>
                    </li>
                    <li id='email' htmlFor="email"  onClick={this.dashNav}>
                        <div id='email' onClick={this.dashNav}>
                            <img src={email} alt="" id='email'/>
                            <h2 id='email'>EMAIL</h2> 
                        </div>
                    </li>                    
                    <li id='home' htmlFor="home"  onClick={this.dashNav}>
                        <div id='home' onClick={this.dashNav}>
                            <img src={home} alt="" id='home'/>
                            <h2 id='home'>HOME</h2> 
                        </div>
                    </li>
                    <li id='logout'><img onClick={this.dashNav} id='logout' src={logout} alt="" />              </li>
                </ul>
            </div>
        )
    }
}

export default AdminPage

