import {React, Component} from "react";
import { FaPlus, FaMinus } from 'react-icons/fa'



export default class UpholsteryScreen extends Component {
    state ={
        upholstery : 0
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
            alert("CANNOT ADD ANYMORE UPHOLSTERY")
        }else{
            this.setState({upholstery : plus1})
        }
    }
    delete  = (e) => {
        const less1 = this.state.upholstery - 1
        this.setState({upholstery : less1})
    }
    
    
    render() {
        const {handleChange} = this.props
        const { values: {upholsteryType, upholsteryType1, color, color1, description,} } = this.props
        return (
            <div className="pi-container bod">
                <form action="" onSubmit={this.continue}>
            <div className="pi-spacing">
                <ul>
                    <li className="upholstery">
                        <div className="up">
                        <div className="uphold">
                            <label htmlFor="type">Upholstery Type</label>
                            <div className="upholstery-type">
                                <select name="upholsteryType" id="upholstery-type" defaultValue={upholsteryType} required onChange={handleChange()} >
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
                            </div>
                            <label htmlFor="color">Color</label>
                            <div className="color">
                                <select name="color" id="color" defaultValue={color} required onChange={handleChange()}>
                                    <option value="" disabled >Color</option>
                                    <option value="Light">Light</option>
                                    <option value="Dark">Dark</option>
                                </select>
                            </div>
                            <hr />
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
                                </div>
                                <label htmlFor="color">Color</label>
                                <div className="color">
                                    <select name="color1" id="color" defaultValue={color1} required onChange={handleChange()}>
                                        <option value="" disabled >Color</option>
                                        <option value="Light">Light</option>
                                        <option value="Dark">Dark</option>
                                    </select>
                                </div>
                                <hr />
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
            <button type="submit" className="next-btn">Next</button>
            </form>
            <button onClick={this.back} className="prev-btn">Prev</button>
        </div>
        )
    }
}
