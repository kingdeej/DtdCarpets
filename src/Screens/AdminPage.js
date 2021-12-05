import React, { Component } from 'react'
import Axios from "axios"
import { Redirect } from 'react-router-dom'

export class AdminPage extends Component {
    state = {
        customerList: [],
        customerListSingle: [],
        name: 0,
        class1: "admin-page",
        class2: "customer-cont customer",
        redirect: false
    }
    customerPage = (e) => {
        e.preventDefault()
        this.props.seeCustomerStep()
    }
    add = (e) => {
        this.setState({class1: "admin-page customer"})
        this.setState({class2: "customer-cont"})
    }
    delete = (e) => {
        this.setState({class1: "admin-page"})
        this.setState({class2: "customer-cont customer"})
    }
    
    getCustomer = () => {
        setTimeout(() => {
            Axios.get("https://us-central1-dtdcarpets.cloudfunctions.net/dtdCarpets/customers").then((response)=>{
                this.setState({customerList: response.data})
            })            
        }, 1000)
    }
    home = () => {
         this.setState({redirect: true})
    }
    componentDidMount(){
        this.getCustomer()
    }
    render() {
        const AdminNon = () => {
            if (this.state.customerList.length === 0) {
                return <h1 className="admin-head">No Customers Yet</h1>
            }else{
                return <h1 className="admin-head">Admin Page</h1>
            }
        }      
        const {organization,firstName,lastName,telephoneNumber,email,upholsteryType,color,description,streetAddress,streetAddress2, city,state,postal,scheduleDate,upholsteryType1, color1} = this.state.customerListSingle
        if (this.state.redirect) {
            return <Redirect push to="/" />;
          }   
        return (
            <>
                <div className={this.state.class1} >
                    <AdminNon />
                    {this.state.customerList.map((val, key)=>{
                        return (
                        <ul id={val.id} key={key} onClick={()=>{const name = document.getElementById(val.id) 
                            const names = name.id
                            this.setState({name: names})
                            this.add()
                            this.setState({customerListSingle: this.state.customerList[names - 1]})
                            }}>
                            <li>
                                <div>
                                    <h2>Name:</h2>
                                    <p>{val.organization}{val.firstName} {val.lastName}</p>
                                    <hr />
                                </div>
                                <div><h2>Date:</h2><p>{val.scheduleDate}</p></div>
                                <div><h2>Upholstery Type:</h2><p>{val.upholsteryType}</p></div>
                                <div><h2>Color:</h2><p>{val.color}</p></div>
                                <div><h2>Telephone Number:</h2><p>{val.telephoneNumber}</p></div>
                                <div><h2>Email:</h2><p>{val.email}</p></div>     
                            </li>
                            
                        </ul>
                        )
                    })}

                </div>
                <div className={this.state.class2}>
                    <ul className="date">
                        <li><h1>Date: </h1><h2>{scheduleDate}</h2></li>
                    </ul>
                    <ul className="upholstery-info">
                        <li><h1>Upholstery Information</h1></li><hr />
                        <li><div><h2>Upholstery Type: </h2> <p>{upholsteryType} {upholsteryType1}</p></div></li>
                        <li><div><h2>Color: </h2><p>{color} {color1}</p></div></li>
                    </ul>
                    <ul className="personal-info">
                        <li><h1>Personal Information</h1></li><hr />
                        <li><div><h2>Name:</h2> <p>{firstName} {lastName}{organization}</p></div></li>
                        <li><div><h2>Email:</h2> <p>{email}</p></div></li>
                        <li><div><h2>Telephone Number:</h2> <p>{telephoneNumber}</p></div></li>
                    </ul>
                    <ul className="address-info">
                        <li><h1>Address Information</h1></li><hr />
                        <li><div> <h2>Street Address Line 1:</h2> <p>{streetAddress}</p></div></li>
                        <li><div><h2>Street Address Line 2:</h2> <p>{streetAddress2}</p></div></li>
                        <li><div><h2>City:</h2> <p>{city}</p></div></li>
                        <li><div><h2>State:</h2> <p>{state}</p></div></li>
                        <li><div><h2>postal:</h2> <p>{postal}</p></div></li>
                    </ul>
                    <ul className="description">
                        <li><h1>Description</h1></li>
                        <li><p>{description}</p></li>
                    </ul>
                    <ul className="button">
                        <li>                    
                            <button onClick={this.delete}>Back</button>
                        </li>
                        <li>     
                            <button onClick={this.home}>Home</button>               
                        </li>
                    </ul>
                </div>
            </>
        )
    }
}

export default AdminPage
