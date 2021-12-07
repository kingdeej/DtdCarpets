import {React, Component} from "react";
import { FaPlus, FaMinus, FaTimes, FaSortDown } from 'react-icons/fa'



export default class UpholsteryScreen extends Component {
    state ={
        upholstery : 0,
        showAlert: "show",
        showAlert1: "show",
        fabricAlert: "fabric-alert"
    }
    continue = e => {
        e.preventDefault()
        this.props.nextStep()
    }
    back = e => {
        e.preventDefault()
        this.props.prevStep()   
    }
     add = (e) => {
        const plus1 = this.state.upholstery + 1
        if (this.state.upholstery === 1) {
            this.setState({showAlert: "alert"})
        }else{
            this.setState({upholstery : plus1})
        }
    }
    delete  = (e) => {
        const less1 = this.state.upholstery - 1
        if(this.state.upholstery < 1){
            this.setState({showAlert1: "alert"})
        }else{
            this.setState({upholstery : less1})
        }
    }
    
    
    render() {
        const {handleChange} = this.props
        const { values: {upholsteryType, upholsteryType1, color, color1, description,} } = this.props
        return (
            <div className="form-cont">
                <form className="form" onSubmit={this.continue}>
                <div className="pi-spacing">
                    <div className="head-info"><h1>Enter Upholstery Info</h1></div>
                    <ul>
                        <li className="upholstery">
                            <div className="up">
                            <div className="uphold">
                                <label htmlFor="type">Upholstery Type</label>
                                <div className="upholstery-type">
                                    <select className="yes" name="upholsteryType" id="upholstery-type" defaultValue={upholsteryType} required onChange={handleChange()} >
                                        <option value="" disabled >Upholstery Type</option>
                                        <option value="Carpet">Carpet</option>
                                        <option value="Rug">Rug</option>
                                        <option value="Large sofa">Large Sofa</option>
                                        <option value="Medium sofa">Medium Sofa</option>
                                        <option value="Small sofa">Small Sofa</option>
                                        <option value="Bar Stools">Bar Stools</option>
                                        <option value="Ottaman">Ottaman</option>
                                        <option value="Counter Stools">Counter Stools</option>
                                        <option value="Swivels and Gliders">Swivels and Gliders</option>
                                        <option value="Accent Chairs">Accent Chairs</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <FaSortDown className="sort-down"/>

                                </div>
                                <label htmlFor="color">Color</label>
                                <div className="color">
                                    <select name="color" id="color" defaultValue={color} required onChange={handleChange()}>
                                        <option value="" disabled >Color</option>
                                        <option value="Light">Light</option>
                                        <option value="Dark">Dark</option>
                                    </select>
                                    <FaSortDown className="sort-down"/>
                                </div>
                                </div>
                                
                                {[...Array(this.state.upholstery)].map((i, key) => {
                                return (
                                    <div className="uphold" key={key}>
                                    <label htmlFor="type">Upholstery Type</label>
                                    <div className="upholstery-type">
                                        <select name="upholsteryType1" id="upholstery-type" defaultValue={upholsteryType1} required onChange={handleChange()} >
                                            <option value="" disabled >Upholstery Type</option>
                                            <option value="Carpet">Carpet</option>
                                            <option value="Rug">Rug</option>
                                            <option value="Large sofa">Large Sofa</option>
                                            <option value="Medium sofa">Medium Sofa</option>
                                            <option value="Small sofa">Small Sofa</option>
                                            <option value="Bar Stools">Bar Stools</option>
                                            <option value="Ottaman">Ottaman</option>
                                            <option value="Counter Stools">Counter Stools</option>
                                            <option value="Swivels and Gliders">Swivels and Gliders</option>
                                            <option value="Accent Chairs">Accent Chairs</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <FaSortDown className="sort-down"/>
                                    </div>
                                    <label htmlFor="color">Color</label>
                                    <div className="color">
                                        <select name="color1" id="color" defaultValue={color1} required onChange={handleChange()}>
                                            <option value="" disabled >Color</option>
                                            <option value="Light">Light</option>
                                            <option value="Dark">Dark</option>
                                        </select>
                                        <FaSortDown className="sort-down"/>
                                    </div>
                                    </div>
                                )
                            })}
                            </div>
                                <span onClick={this.add}>Add</span><FaPlus onClick={this.add} color="white" className="fa-plus" />
                                <span onClick={this.delete}>Delete</span><FaMinus onClick={this.delete} color="white"/>

                            <div className="description">
                                <label htmlFor="description">Description <span>*Optional</span></label> <br />
                                <textarea name="description" className="text-area" onChange={handleChange()} defaultValue={description}  placeholder="Write a description about your carpet or upholstery"></textarea>
                            </div>
                        </li>  
                    </ul>
                </div>
                <ul className="button-ul">
                    <li>
                        <button onClick={this.back} className="prev-btn">Prev</button>
                    </li>
                    <li>
                        <button type="submit" className="next-btn">Next</button>
                    </li>
                </ul>
            </form>
            <div className={`${this.state.showAlert}`}><h5>Cannot Add More Upholstery</h5> <span className="times" onClick={()=>{this.setState({showAlert: "show"})}}><FaTimes /></span></div>
            <div className={`${this.state.showAlert1}`}><h5>Please Add Upholstery</h5> <span className="times" onClick={()=>{this.setState({showAlert1: "show"})}}><FaTimes /></span></div>
            <div className={`${this.state.fabricAlert}`}><h5>Fabric based material only</h5></div>
        </div>
        )
    }
}
