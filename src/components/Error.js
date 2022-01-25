import React, { Component } from 'react'

export class Error extends Component {

    render() {
        return (
            <div className="error">
                <h1>Try Again</h1>
                <button className="error-btn" onClick={this.props.refresh}>Refresh Page</button>
            </div>
        )
    }
}

export default Error
