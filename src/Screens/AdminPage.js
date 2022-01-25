import React, { Component } from 'react'
import Axios from "axios"
import { Redirect, withRouter} from 'react-router-dom'
import Loading from '../components/Loading'
import Error from '../components/Error';

export class AdminPage extends Component {
    _isMounted = false;
    state = {
        customerList: [].reverse(),
        customerListSingle: [],
        name: 0,
        class1: "admin-page",
        class2: "customer-cont customer",
        redirect: false,
        loading: <Loading/>,
        counter: 0,
        step: 1,
        home: false,
        error: null
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
        this.setState({redirect: true})
    }
    
    getCustomer = () => {
        this.setState({loading: <Loading />})
        this.setState({error: null})
        setTimeout(() => {
            Axios.get("https://us-central1-dtdcarpets.cloudfunctions.net/dtdCarpets/customers")
            .then((response)=>{
                this.setState({customerList: response.data})
                if (response.status !== 200) {
                    this.setState({loading: null})
                    this.setState({error: <Error refresh = {this.getCustomer}/>})
                }
            })              
            .catch((error)=>{
                this.setState({loading: null})
                this.setState({error: <Error refresh = {this.getCustomer}/>})
                console.log(error.message);
            } )
        }, 1000);
        
    }
    getId = (id) => {
        console.log(id)
        this.setState({customerListSingle: this.state.customerList[id]})
        this.setState({step: 2})
        this.setState({id: id})
        this.setState({redirect: true})
    }
    home = () => {
         this.setState({home: true})
         this.setState({redirect: true})
    }
    componentDidMount(){
        this._isMounted = true;
        if (this._isMounted) {
            this.getCustomer()           
        }
    }
    componentWillUnmount(){
        this._isMounted = true;
    }
    componentDidUpdate(prevProp, prevState){
        if (this.state.counter === prevState.counter) {
            this.setState({redirect: false})
            this.setState({counter: this.state.counter+1})
            if (window.location.pathname.endsWith('customer') || window.location.pathname.endsWith('admin')) {
                this.setState({step: 1})
                this.setState({class1: "admin-page"})
                this.setState({class2: "customer-cont customer"})
        
            }else{
                this.setState({step: 2})
                this.setState({class1: "admin-page customer"})
                this.setState({class2: "customer-cont"})
            }
        }
    }

    render() {
        const {step} = this.state
        const AdminNon = () => {
            if (this.state.customerList.length === 0) {
                return <h1 className="admin-head">No Customers Yet</h1>
            }else{
                return <h1 className="admin-head">Admin Page</h1>
            }
        }      
        const {organization,firstName,lastName,telephoneNumber,email,upholsteryType,color,description,streetAddress,streetAddress2, city,state,postal,scheduleDate,upholsteryType1, color1} = this.state.customerListSingle
        if (this.state.redirect) {
            if (window.location.pathname.endsWith('customer') || window.location.pathname.endsWith('admin')) {
                return <Redirect push to={`/admin/customer/${this.state.id}`} />;               
            }
            if (this.state.home) {
                return <Redirect push to="/" />;
            }
            if (!window.location.pathname.endsWith('customer')) {
                return <Redirect push to={`/admin/customer`} />;               
            }
        }   
        switch (step) {
            case 1:
                return(
                    <div className={this.state.class1} >
                    <AdminNon />
                    {this.state.error}
                    {!this.state.customerList.length ? this.state.loading : null} 
                    {this.state.customerList.map((val, key)=>{
                        return (
                        <ul id={val.id} key={key} onClick={()=>{
                            this.getId(val.id)
                            this.add()
                            }}>
                            <li>
                                <div>
                                    <h2>{val.organization}{val.firstName} {val.lastName}</h2>
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
                )   
            case 2:
                return(
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
                )
            default:
        } 
    }
}

export default withRouter(AdminPage);
