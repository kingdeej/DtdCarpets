import React, { Component } from 'react'
import Axios from "axios"
import { Redirect, withRouter} from 'react-router-dom'
import Loading from '../components/Loading'
import Error from '../components/Error';
import { FaArrowLeft } from 'react-icons/fa'


export class Customers extends Component {
    _isMounted = false;
    state = {
        customerList: [],
        customerListSingle: [],
        name: 0,
        class1: "admin-page",
        redirect: false,
        loading: <Loading/>,
        counter: 0,
        home: false,
        error: null,
        dash: false
    }
    customerPage = (e) => {
        e.preventDefault()
        this.props.seeCustomerStep()
    }
    dash =() => {
        this.setState({redirect: true})
        this.setState({dash: true})
    }
    add = (e) => {
        this.setState({class1: "admin-page customer"})
    }
    getCustomer = () => {
        this.setState({loading: <Loading />})
        this.setState({error: null})
        if (!localStorage.length) {
            setTimeout(() => {
                Axios.get("https://us-central1-dtdcarpets.cloudfunctions.net/dtdCarpets/customers")
                .then((response)=>{
                    localStorage.setItem('customerList', JSON.stringify(response.data.reverse()))
                    const customerList = localStorage.getItem('customerList')
                    this.setState({customerList: JSON.parse(customerList) })
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
            clearTimeout(this.getCustomer)
        }
        else{
            const customerList = localStorage.getItem('customerList')
            this.setState({customerList: JSON.parse(customerList) })
        }
        
    }
    getId = (id) => {
        console.log(id)
        this.setState({customerListSingle: this.state.customerList[id]})
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
        console.log();
    }
    componentWillUnmount(){
        this._isMounted = true;
    }
    componentDidUpdate(prevProp, prevState){
        if (this.state.counter === prevState.counter) {
            this.setState({redirect: false})
            this.setState({counter: this.state.counter+1})
            if (window.location.pathname.endsWith('customers')) {
                this.setState({class1: "admin-page"})
            }
        }
    }

    render() {
        const {step} = this.state
        const AdminNon = () => {
            if (this.state.customerList.length === 0) {
                return <h1 className="admin-head">No Customers Yet</h1>
            }else{
                return <h1 className="admin-head">Customers Page</h1>
            }
        }      
        const {organization,firstName,lastName,telephoneNumber,email,upholsteryType,color,description,streetAddress,streetAddress2, city,state,postal,scheduleDate,upholsteryType1, color1} = this.state.customerListSingle
        if (this.state.redirect) {
            if (this.state.dash) {
                return <Redirect push to="/admin" />;
            }
            if (window.location.pathname.endsWith('customers')) {
                return <Redirect push to={`/admin/customer/${this.state.id}`} />;               
            }
            if (this.state.home) {
                return <Redirect push to="/" />;
            }


        }  
        return(
            <div className="admin-page-cont">        
                <div className={this.state.class1} >
                <AdminNon />
                {this.state.error}
                <FaArrowLeft size={20} onClick={this.dash} cursor={"pointer"}/>
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
        </div>
        )   
    }
}


export default Customers
