import React, { Component } from 'react'
import Axios from 'axios'
import FormAddressDetails from './FormAddressDetails'
import FormPersonalDetails from './FormPersonalDetails'
import FormUpholsteryDetails from './FormUpholsteryDetails'
import ThankYou from './ThankYou'
import emailjs from 'emailjs-com'
import SetAppointmentScreen from './SetAppointmentScreen'
import { withRouter } from 'react-router'
import Loading from '../components/Loading'

export class useForm extends Component {
    state = {
        step: 1
        ,
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
        counter: 0,
        isAuth: false,
        isAdmin: false,
        redirect: false,
        loading: <Loading />,
        ifLoading: false
    }
    getCustomerId = () => {
        setTimeout(() => {
            Axios.get("https://us-central1-dtdcarpets.cloudfunctions.net/dtdCarpets/getCustomerid").then((response)=>{
                const data = response.data
                this.setState({id: (data[0]["MAX(id)"])});
                if(this.state.id === null){
                    this.setState({id: 0})
                }
                else{
                    this.setState({id: this.state.id + 1})
                }
            })             
        }, 1000)
        clearTimeout(this.getCustomerId)
    }      

    componentDidMount() {
        this.getCustomerId()
    }
    componentWillUnmount() {
        this.getCustomerId()
    }
    componentDidUpdate(prevProp, prevState){
        if (prevState.counter === this.state.counter) {

            if (this.state.isAuth === false) {
                if (parseInt(window.location.pathname.slice(-1)) !== 1) {
                    this.props.history.push('/useform/1')
                }
            }else{
                this.setState({counter: this.state.counter+1})
                this.setState({step: parseInt(window.location.pathname.slice(-1)) })                
            }
        }

    }




    sendEmail = () => {
        this.setState({ifLoading: true})
        let load = ()=>{
            this.setState({ifLoading: false})
        }
        emailjs.send('asfsquidy', 'template_c0xqflt', this.state,"user_PXn2f8Pt6N57O4XbQ4alf")
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            load()
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
    prevStep = () => {
        const { step } = this.state
        this.setState({prevStep: step})
        this.setState({url: window.location.pathname.slice(-1)})
        this.setState({
            step : step - 1
        })
        this.props.history.push(`/useform/${this.state.step -1}`)
        this.setState({isAuth: true})
    }

    nextStep = () => {        
            const { step } = this.state        
            this.setState({prevStep: step})
            this.setState({url: window.location.pathname.slice(-1)})
            this.setState({
                step : step + 1
            })
            this.props.history.push(`/useform/${step + 1}`)
            this.setState({isAuth: true})
    }

    seeCustomerStep = () => {
        const { step } = this.state
        this.setState({
            step : step + 1
        })
    }
    


    handleChange = name => (e) => {
        const name = e.target.name
        this.setState({[name]: e.target.value,})
      }


    render() {
        const { step, ifLoading, loading} = this.state
        const {button} = this.props
        const {value, organization, color1, firstName, lastName, telephoneNumber, email, upholsteryType, upholsteryType1, color, description, streetAddress, streetAddress2, city, state, postal, scheduleDate } = this.state
        const values = {value, color1, organization, firstName, lastName, telephoneNumber, email, upholsteryType, upholsteryType1, color, description, streetAddress, streetAddress2, city, state, postal, scheduleDate }        
        switch(step){
            case 1:
                return(
                    <SetAppointmentScreen
                    nextStep={this.nextStep}
                    step={this.state.step}
                    />
                )
            case 2:
                return(
                    <FormPersonalDetails 
                    nextStep={this.nextStep}
                    handleChange={this.handleChange}
                    values={values}
                    onCreditCardChange ={this.onCreditCardChange}
                    step={this.state.step}
                    button={button}
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
                    step={this.state.step}
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
                    step={this.state.step}
                    />
                )
            case 5:
                return(
                    <ThankYou
                        ifLoading = {ifLoading}
                        loading = {loading}
                    />
                )
            default:
        }
    }
}

export default withRouter(useForm) 