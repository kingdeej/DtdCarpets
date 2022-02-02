import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export class AdminToolBar extends Component {
    state = {
        redirect: false,
        dash: false,
        email: false,

    }
    toolBarNav = (e) => {
        const id = e.target.id
        this.setState({redirect: true})
        this.setState({[id]: true})
        this.setState({[id]: true})
    }
    render() {
        if (this.state.redirect) {
            if (this.state.dash) {
                return <Redirect push to="/admin" />               
            }
            if (this.state.email) {
                return <Redirect push to="/admin/addemail" />       
            }
        }
        return (
            <div className="admintoolbar">
                <ul>
                    <li>
                        <button id="dash" onClick={this.toolBarNav}>Go to DashBoard</button>
                    </li>
                    <li><button id="email" onClick={this.toolBarNav}>Add customer email</button></li>
                </ul>
            </div>
        )
    }
}

export default AdminToolBar
