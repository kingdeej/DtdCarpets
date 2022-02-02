import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export class AddEmail extends Component {
    state = {
        redirect: false
    }
    back = () => {
        this.setState({redirect: true})
    }
    render() {
        if (this.state.redirect) {
            return <Redirect push to="/admin"/>
        }
        return (
            <div className='addEmail'>
                <label htmlFor=""><h2>Enter Email</h2> </label>
                <input type="email" placeholder='Enter Email Here' name="email" id="email" />
                <div>
                    <button onClick={this.back}>Back</button>
                    <button>Submit</button>
                </div>
            </div>
        )
    }
}

export default AddEmail
