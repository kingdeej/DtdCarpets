import axios from 'axios';
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Loading from '../components/Loading'
import deletes from '../images/delete.png';


export class Customer extends Component {
    state = {
        loading: <div className="loading-cont"><Loading /></div> ,
        error: null,
        customerList: [],
        show: "show",
        showQuestion: "show",
        redirect: false,
        home: false,
        id: null
    }
    back = () => {
        this.setState({redirect: true})
    }
    home = () => {
        this.setState({home: true})
        this.setState({redirect: true})
    }
    getCustomerId = (e) => {
      this.setState({id: e.target.id})
      this.setState({showQuestion: ""})

    };
    
    deleteCustomer = (e) => {
        const pathname = window.location.pathname.slice(-1)
        this.setState({showQuestion: "show"})
        setTimeout(() => {
            axios.delete(`https://us-central1-dtdcarpets.cloudfunctions.net/dtdCarpets/delete/${pathname}`, {
                id: pathname
            }).then(()=>{
                const customerList = JSON.parse(localStorage.getItem('customerList'))
                const results = customerList.filter(id => id.id !== parseInt(pathname))
                localStorage.setItem('customerList', JSON.stringify(results))
                this.setState({redirect: true})
            }).catch((error)=>{
                console.log(error.message);
            })
        }, 1000);

    };

    getCustomer = () => {
        this.setState({loading: <div className="loading-cont"><Loading /></div>})
        this.setState({error: null}) 
        const pathname = parseInt(window.location.pathname.slice(-1)) 
        const customerList = JSON.parse(localStorage.getItem('customerList'))
        if (localStorage.getItem('customerList') !== null) {
            this.setState({customerList: customerList.find(({id}) => id === pathname )})
        }
        this.setState({loading: null})
        this.setState({show: ""})
    }
    componentDidMount(){
        this.getCustomer()
    }
    render() {
        if (this.state.redirect) {
            if (!this.state.home) {
                return <Redirect push to="/admin/customers"/>
            }else{
                return <Redirect push to="/"/>
            }
        }
        const {customerList}= this.state
            return(
                <div>
                    <div className={`${this.state.show} customer-cont`}>
                        <ul className="date">
                            <li><h1>Date: </h1><h2>{customerList.scheduleDate}</h2></li>
                        </ul>
                        <ul className="upholstery-info">
                            <li><h1>Upholstery Information</h1></li><hr />
                            <li><div><h2>Upholstery Type: </h2> <p>{customerList.upholsteryType} {customerList.upholsteryType1}</p></div></li>
                            <li><div><h2>Color: </h2><p>{customerList.color} {customerList.color1}</p></div></li>
                        </ul>
                        <ul className="personal-info">
                            <li><h1>Personal Information</h1></li><hr />
                            <li><div><h2>Name:</h2> <p>{customerList.firstName} {customerList.lastName}{customerList.organization}</p></div></li>
                            <li><div><h2>Email:</h2> <p>{customerList.email}</p></div></li>
                            <li><div><h2>Telephone Number:</h2> <p>{customerList.telephoneNumber}</p></div></li>
                        </ul>
                        <ul className="address-info">
                            <li><h1>Address Information</h1></li><hr />
                            <li><div> <h2>Street Address Line 1:</h2> <p>{customerList.streetAddress}</p></div></li>
                            <li><div><h2>Street Address Line 2:</h2> <p>{customerList.streetAddress2}</p></div></li>
                            <li><div><h2>City:</h2> <p>{customerList.city}</p></div></li>
                            <li><div><h2>State:</h2> <p>{customerList.state}</p></div></li>
                            <li><div><h2>postal:</h2> <p>{customerList.postal}</p></div></li>
                        </ul>
                        <ul className="description">
                            <li><h1>Description</h1></li>
                            <li><p>{customerList.description}</p></li>
                        </ul>
                        <ul className="button">
                            <li>                    
                                <button onClick={this.back}>Back</button>
                            </li>
                            <li>     
                                <button onClick={this.home}>Home</button>               
                            </li>
                            <li className='delete-cont' onClick={this.getCustomerId}>
                                <img src={deletes} id={customerList.id} alt="delete" />
                            </li>
                        </ul>
                    </div>
                    
                    <div className={`${this.state.showQuestion} delete-question-cont`}>
                    <div className='delete-question'>
                        <h3>Are You sure you want to delete this review</h3>
                        <ul>
                            <li><button onClick={()=>{this.setState({showQuestion: "show"})}} >No</button></li>
                            <li><button onClick={this.deleteCustomer} >Yes</button></li>
                        </ul>
                    </div>
                </div>
                </div>
            )


    }
}

export default Customer
