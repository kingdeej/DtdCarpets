import Axios from 'axios'
import React, { Component } from 'react'
import { FaTimes } from 'react-icons/fa'
import Cleave from 'cleave.js/react';
import { Redirect } from 'react-router';
import Cookies from 'universal-cookie';
;

require('cleave.js/dist/addons/cleave-phone.ca')

export default class FormPersonalDetails extends Component {

    state = {
        count: 0,
        admin:[],
        showAlert: "show ",
        redirect: false,
    }
    back = e => {
        e.preventDefault()
        this.props.prevStep()   
    }
    redirect= () => {
        this.setState({redirect: true})
    };
    

    continue = e => {
        e.preventDefault()
        setTimeout(() => {
            Axios.get("https://us-central1-dtdcarpets.cloudfunctions.net/dtdCarpets/admin")
            .then((response)=>{
                this.setState({admin: response.data[0]})
                const {adminEmail, adminTelephoneNumber, adminName} = this.state.admin
                const {values: {telephoneNumber, email}}= this.props
                const {values: {organization, firstName, lastName}}= this.props
                if(email === adminEmail && telephoneNumber === adminTelephoneNumber && organization.toLowerCase() === adminName){
                    const cookies = new Cookies()
                    cookies.set('isAuth', true, { path: '/' });
                    this.redirect()
                }else if((organization.length > 0 && firstName.length === 0 && lastName.length === 0)|| (firstName.length > 0 && organization.length === 0 && lastName.length > 0) ){
                    this.props.nextStep()
                }else{
                    this.setState({showAlert: "alert"})
                }
            })
            .catch((error)=>{
                console.log(error.message);
            } )
        }, 1000);

    }

        render() {
            const cookies = new Cookies()
            const {handleChange, onCreditCardChange} = this.props
            const { values: {telephoneNumber, organization, firstName, lastName, email} } = this.props  
            if (this.state.redirect) {
                return <Redirect push to="/admin" />;
            }   

  
        return (
                <div className="form-cont">
                    <form className="form" id="form-sub" onSubmit={this.continue}>
                    <div>
                        <div className="name">
                            <div className="head-info">
                                {cookies.get('isAuth') === "true" ? <h3 onClick={this.redirect}>Go to Admin</h3> : null}
                                <h1>Enter Personal Info</h1>
                                <hr className="head-hr" />
                            </div>
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
                                <li className="name-cont">
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
                                <hr/>
                                <li>
                                    <div>
                                        <label htmlFor="">Telephone Number:</label>
                                        <div>
                                        <Cleave value={telephoneNumber} placeholder="Enter your Phone Number"
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
                            </ul>  
                        </div>
                    </div>
                    <ul className="button-ul">

                        <li>
                            <button type="submit" className="next-btn">Next</button>
                        </li>
                    </ul>
                    </form>
                    <div className={`${this.state.showAlert}`}><h5>Please fill out form</h5> <span className="times" onClick={()=>{this.setState({showAlert: "show"})}}><FaTimes /></span></div>
                </div>
        );
    }
}

