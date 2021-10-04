import Axios from 'axios'
import React, { Component } from 'react'
import { FaEye } from 'react-icons/fa'
import Cleave from 'cleave.js/react';
require('cleave.js/dist/addons/cleave-phone.ca')

export default class FormPersonalDetails extends Component {

    state = {
        count: 0,
        show: "password",
        admin:[],
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
        }
    }
    adminGet = (e) => {
        Axios.get("https://dtd-carpets.herokuapp.com/admin").then((response)=>{
            this.setState({admin: response.data[0]})
            const {adminEmail, adminPassword, adminTelephoneNumber} = this.state.admin
            const {values: {telephoneNumber, email, password}}= this.props
            if(email === adminEmail && telephoneNumber === adminTelephoneNumber && password === adminPassword){
                this.props.adminStep()
            }
        })
    }

        render() {
            const {handleChange, onCreditCardChange } = this.props
            const { values: {organization, firstName, lastName, email, password} } = this.props    
        return (
                <div className="pi-container">
                    <form action="" id="form-sub" onSubmit={this.continue}>
                    <div className="pi-spacing">
                        <div className="name">
                            <ul>
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
                                        <label htmlFor="name">Name:</label> 
                                        <div className="sub-txt">
                                            <input type="text" name ="firstName"  defaultValue={firstName} onChange={handleChange()}/>
                                            <br /><label htmlFor="sub-txt">First Name</label>
                                        </div>
                                    </div>
                                    <div className="right-side">
                                        <div className="sub-txt">
                                            <input type="text"  name ="lastName" defaultValue={lastName} onChange={handleChange()}/>
                                            <br /><label htmlFor="sub-txt">Last Name</label>
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
                                            <FaEye className="peak" color="white" onClick={this.showPassword}/>
                                        </div>
                                    </div>
                                </li>                          
                            </ul>  
                        </div>
                    </div>
                    <button type="submit" className="next-btn" onClick={this.adminGet}>Next</button>
                    </form>
                </div>
        );
    }
}

