import React, { Component } from 'react'
import { FaArrowRight } from 'react-icons/fa'

export class SetAppointmentScreen extends Component {
    
    render() {
        return (
            <div className="go">
                <div className="set-appointment">
                    <h1>Set Appointment</h1> 
                    
                    <div className="button-go">
                        <button onClick={this.props.nextStep}>
                            Go
                            <FaArrowRight className="arrow-right"/>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SetAppointmentScreen
