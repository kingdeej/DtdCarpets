import React, { Component } from 'react'
import moment from "moment";

export default class AddressScreen extends Component {
    state ={
        dat1: moment().format("D"),
        dat2: "",
        date_create: moment().format("YYYY-MM-")
    }

    componentDidMount() {
        const tostr = parseInt(this.state.dat1) + 1
        if(this.state.dat1.length === 1){
           this.setState({dat2: "0" + tostr})
        }
    }

    continue = e => {
        e.preventDefault()
        this.props.addCustomer()
        this.props.sendEmail()
        this.props.nextStep()
    }
    
    back = e => {
        e.preventDefault()
        this.props.prevStep()   
    }


    render() {
        const {handleChange} = this.props
        const { values: {streetAddress, streetAddress2, city, postal, state, scheduleDate} } = this.props
        return (
            <div>
                <div className="form-cont">
                    <form className="form" onSubmit={this.continue}>
                    <div className="pi-spacing">
                        <ul className="address">
                            <li className="street-address" >
                                <label htmlFor="text">Street Address</label>
                                <div>
                                    <input defaultValue={streetAddress} onChange={handleChange()} required type="text" name="streetAddress"/>
                                </div>
                            </li>
                            <li className="street-address2">
                                <label htmlFor="">Street Address Line 2</label>
                                <div>
                                    <input defaultValue={streetAddress2} onChange={handleChange()} type="text" name="streetAddress2"/>
                                </div>
                            </li>
                            <li className ="address-sep">
                                <div className="city">
                                    <label htmlFor="city">City</label>
                                    <div>
                                        <input defaultValue={city} required onChange={handleChange()} type="text" name ="city"/>
                                    </div>
                                </div>
                                <div className="State / Providence">
                                    <label htmlFor="state">State / Providence</label>
                                    <div>
                                        <input defaultValue={state} required onChange={handleChange()} type="text" name="state" />
                                    </div>
                                </div>
                            </li>
                            <li className="Postal / Zip Code">
                                <label htmlFor="postal">Postal / Zip Code</label>
                                <div>
                                    <input defaultValue={postal} required onChange={handleChange()} type="number" placeholder="Enter Zip Code"  min="1" name="postal" />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="scheduleDate">Schedule Appointment</label>
                                <div>
                                    <input type="date" name="scheduleDate" min={this.state.date_create + this.state.dat2} defaultValue={scheduleDate} onChange={handleChange()} required></input>
                                </div>
                            </li>
                        </ul>           
                    </div>
                    <button type="submit" className="next-btn">Confirm</button>
                    <button onClick={this.back} className="prev-btn">Prev</button>                
                </form>
            </div>
            </div>
        )
    }
}
