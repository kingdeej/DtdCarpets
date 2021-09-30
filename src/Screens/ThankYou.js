import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class ThankYou extends Component {
    render() {
        return (
            <div className="pi-container pi-spacing">
                <div className="dtd-carpets">
                    <h1 className="thanks">Thank You</h1>
                    <Link to="/" ><button className="thanks-btn">Home</button> </Link>
                    
                </div>
            </div>
        )
    }
}

export default ThankYou
