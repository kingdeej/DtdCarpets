import Axios from 'axios'
import React, { Component } from 'react'
import { FaEye, FaTimes } from 'react-icons/fa'
import Cleave from 'cleave.js/react';
require('cleave.js/dist/addons/cleave-phone.ca')

export default class FormPersonalDetails extends Component {

    state = {
        count: 0,
        show: "password",
        admin:[],
        showAlert: "show "
    }

    showPassword = () =>{
        if (this.state.count === 0) {
            const countPlus = this.state.count +1
            this.setState({count: countPlus})
            this.setState({show: "text"})
        }else if (this.state.count === 1){
            const countMinus = this.state.count -1
            this.setState({count: countMinus})
            this.setState({show: "password"})            
        }

    }

    continue = e => {
        e.preventDefault()
        const {values: {organization, firstName, lastName}}= this.props
        if((organization.length > 0 && firstName.length === 0 && lastName.length === 0)|| (firstName.length > 0 && organization.length === 0 && lastName.length > 0) ){
            this.props.nextStep()
        }else{
            this.setState({showAlert: "alert"})
        }
    }
    adminGet = (e) => {
        Axios.get("https://us-central1-dtdcarpets.cloudfunctions.net/dtdCarpets/admin").then((response)=>{
            this.setState({admin: response.data[0]})
            const {adminEmail, adminPassword, adminTelephoneNumber} = this.state.admin
            const {values: {telephoneNumber, email, password}}= this.props
            if(email === adminEmail && telephoneNumber === adminTelephoneNumber && password === adminPassword){
                this.props.adminStep()
            }else{
                this.setState({showAlert: "alert"})
            }
        })
    }

        render() {
            const {handleChange, onCreditCardChange } = this.props
            const { values: {organization, firstName, lastName, email, password} } = this.props  
  
        return (
                <div className="form-cont">
                    <form className="form" id="form-sub" onSubmit={this.continue}>
                    <div>
                        <div className="name">
                            <div className="head-info"><h1>Enter Personal Info</h1></div>
                            <ul className="ul">
                                <li>
                                    <div>
                                        <label htmlFor="">Organization's Name:</label>
                                        <div>
                                            <input type="text" defaultValue={organization}  onChange={handleChange()} placeholder="Organization's Name"  name ="organization"/>
                                        </div>
                                    </div>
                                </li> 
                                <li className="or"><h2>Or</h2></li>
                                <li className="name-cont org-name">
                                    <div className="left-side">
                                        <label htmlFor="name">First Name:</label> 
                                        <div className="sub-txt">
                                            <input type="text" name ="firstName"  defaultValue={firstName} onChange={handleChange()}/>
                                        </div>
                                    </div>
                                    <div className="right-side">
                                    <label htmlFor="name">Last Name:</label> 
                                        <div className="sub-txt">
                                            <input type="text"  name ="lastName" defaultValue={lastName} onChange={handleChange()}/>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <label htmlFor="">Telephone Number</label>
                                        <div>
                                        <Cleave placeholder="Enter your Phone Number"
                                            options={{phone: true, phoneRegionCode:"us"}}
                                            onChange={onCreditCardChange()}  required/>
                                        </div>
                                    </div>
                                   
                                </li>
                                <li>
                                    <div className="email">
                                        <label htmlFor="email">Email:</label>
                                        <div>
                                            <input type="email" defaultValue={email} required onChange={handleChange()} placeholder="example@gmail.com"  name ="email" />
                                        </div>
                                    </div>
                                </li>                          
                                <li>
                                    <div className="password">
                                        <label htmlFor="email">Password:</label>
                                        <div className="peak-cont">
                                            <input type={this.state.show} defaultValue={password} required onChange={handleChange()}  name ="password"/>
                                            <FaEye className="peak" color="black" onClick={this.showPassword}/>
                                        </div>
                                    </div>
                                </li>                          
                            </ul>  
                        </div>
                    </div>
                    <button type="submit" className="next-btn" onClick={this.adminGet}>Next</button>
                    </form>
                    <div className={`${this.state.showAlert}`}><h5>Please fill out form</h5> <span className="times" onClick={()=>{this.setState({showAlert: "show"})}}><FaTimes /></span></div>
                </div>
        );
    }
}

