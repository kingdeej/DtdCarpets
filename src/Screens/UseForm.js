import React, { Component } from 'react'
import Axios from 'axios'
import AdminPage from './AdminPage'
import FormAddressDetails from './FormAddressDetails'
import FormPersonalDetails from './FormPersonalDetails'
import FormUpholsteryDetails from './FormUpholsteryDetails'
import ThankYou from './ThankYou'
import emailjs from 'emailjs-com'
import SetAppointmentScreen from './SetAppointmentScreen'


export class useForm extends Component {
    state = {
        step: 5,
        value: 0,
        id: null,
        organization:"",
        firstName:"",
        lastName:"",
        telephoneNumber:"",
        email:"",
        upholsteryType:"",
        color:"",
        description:"",
        streetAddress: "",
        streetAddress2: "",
        city: "",
        state: "",
        postal: 0,
        scheduleDate: "",
        upholsteryType1: "",
        color1: "",
    }
    getCustomerId = () => {
        setTimeout(() => {
            Axios.get("https://us-central1-dtdcarpets.cloudfunctions.net/dtdCarpets/getCustomerid").then((response)=>{
                function extractValue(arr, prop) {
    
                    let extractedValue = [];
                
                    for (let i=0; i < arr.length ; ++i) {
                
                        // extract value from property
                        extractedValue.push(arr[i][prop]);
                    }
                    return extractedValue;
                }
                this.setState({id: response.data})
                const result = extractValue(this.state.id, 'MAX(id)');
                this.setState({id: parseInt(result)})
                if(isNaN(this.state.id)){
                    this.setState({id: 1})
                }else{
                    this.setState({id: parseInt(result) + 1})
                }
            })             
        }, 1000)
       
    }
    componentDidMount(){
        this.getCustomerId()
    }

    sendEmail = () => {
        emailjs.send('asfsquidy', 'template_c0xqflt', this.state,"user_PXn2f8Pt6N57O4XbQ4alf")
        .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
        console.log('FAILED...', error);
        });        
    }


    ///create
    addCustomer  = (e) => {
        Axios.post("https://us-central1-dtdcarpets.cloudfunctions.net/dtdCarpets/create", {
            id: this.state.id,
            organization: this.state.organization,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            telephoneNumber: this.state.telephoneNumber,
            email: this.state.email,
            upholsteryType:this.state.upholsteryType,
            color:this.state.color,
            description:this.state.description,
            streetAddress: this.state.streetAddress,
            streetAddress2: this.state.streetAddress2,
            city: this.state.city,
            state: this.state.state,
            postal: this.state.postal,
            scheduleDate: this.state.scheduleDate,
            upholsteryType1: this.state.upholsteryType1,
            color1: this.state.color1,
            }).then(() => {
                console.log("Success")
            })
    }
     
    onCreditCardChange = value => (event) => {
        this.setState({telephoneNumber: event.target.value})
    }

    onSelectChange = id => (e) => {
        this.setState({[e.name]: e.value})
    }
    

    //proceed to next step

    nextStep = () => {
        const { step } = this.state
        this.setState({
            step : step + 1
        })
    }
    adminStep = () => {
        const { step } = this.state
        this.setState({
            step : step + 4
        })
    }
    seeCustomerStep = () => {
        const { step } = this.state
        this.setState({
            step : step + 1
        })
    }
    
    prevStep = () => {
        const { step } = this.state
        this.setState({
            step : step - 1
        })
    }

    handleChange = name => (e) => {
        const name = e.target.name
        this.setState({[name]: e.target.value,})
      }


    render() {
        const { step } = this.state
        const {value, organization, color1, firstName, lastName, telephoneNumber, email, upholsteryType, upholsteryType1, color, description, streetAddress, streetAddress2, city, state, postal, scheduleDate } = this.state
        const values = {value, color1, organization, firstName, lastName, telephoneNumber, email, upholsteryType, upholsteryType1, color, description, streetAddress, streetAddress2, city, state, postal, scheduleDate }        
        switch(step){
            case 1:
                return(
                    <SetAppointmentScreen 
                    nextStep={this.nextStep}
                    />
                )
            case 2:
                return(
                    <FormPersonalDetails 
                    nextStep={this.nextStep}
                    handleChange={this.handleChange}
                    adminStep = {this.adminStep}
                    values={values}
                    onCreditCardChange ={this.onCreditCardChange}
                    />
                )
            case 3:
                return(
                    <FormUpholsteryDetails 
                    prevStep= {this.prevStep}
                    nextStep={this.nextStep}
                    handleChange={this.handleChange}
                    onSelectChange={this.onSelectChange}
                    values={values}
                    />
                )
            case 4:
                return(
                    <FormAddressDetails 
                    nextStep = {this.nextStep}
                    prevStep= {this.prevStep}
                    handleChange={this.handleChange}
                    addCustomer = {this.addCustomer}
                    values={values}
                    sendEmail= {this.sendEmail}
                    />
                )
            case 5:
                return(
                    <ThankYou />
                )
            case 6:
                return(
                    <AdminPage
                    seeCustomerStep={this.seeCustomerStep}
                    getVal={this.getVal}
                    />
                )
            default:
        }
    }
}

export default useForm