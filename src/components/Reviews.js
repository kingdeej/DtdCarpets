import React, { Component } from 'react'
import { FaStar} from 'react-icons/fa'
import Axios from 'axios'

export class Reviews extends Component {

    state = {
        rating: null,
        hover: null,
        review: "",
        name: "",
        upholstery: "",
        imageSelected: "",
        imageId:"",
        id: null,
    }
    componentDidMount(){
        Axios.get("https://dtd-carpets.herokuapp.com/getCustomerid").then((response)=>{
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
    }


    handleChange = (e) => {
        const name = e.target.name
        this.setState({[name]: e.target.value,})
        
    }
    handleSubmit = (e) => {
        e.preventDefault() 
        if(this.state.rating < 1 ){
            alert("Please place a rating")   
        }else{
            const formData = new FormData();
            formData.append("file", this.state.imageSelected);
            formData.append("upload_preset", "mxkyqztd");
    
            Axios.post("https://api.cloudinary.com/v1_1/asfsquidy/image/upload", formData).then((response)=>{
                console.log(response)
                this.setState({imageId: response.data.public_id})

                Axios.post("https://dtd-carpets.herokuapp.com/review", {
                    id: this.state.id,
                    name: this.state.name,
                    upholsteryType: this.state.upholsteryType,
                    rating: this.state.rating,
                    review: this.state.review,
                    imageId: this.state.imageId 
                }).then(()=>{
                    console.log("success")
                    window.location.reload(false);

                })
            })

        }
    }
      
    render(){
        
        return (
            <div className="rev-container">
                <form action="" onSubmit={this.handleSubmit}>
                    <h1 className="reviews-head">Wanna write a review?</h1>
                    <ul className="rev-cont">
                        <li>
                            <h3>Ratings: {this.state.rating} Stars</h3>
                        </li>
                        <li>
                            {[...Array(5)].map((star, i) => {
                            const ratingValue = i + 1
                            return (
                            <label key={i}  className="stars">
                                <FaStar 
                                size={30} 
                                color={ratingValue <= (this.state.hover || this.state.rating) ? "#ffc107" : "#e4e5e9"} 
                                value={ratingValue} 
                                onMouseEnter={()=> {this.setState({hover : ratingValue})}}
                                onMouseLeave={()=> {this.setState({hover : null})}}
                                onClick={()=> {this.setState({rating : ratingValue})}} 
                                className="star"/> 
                                
                            </label> 
                            )
                        })}
                        </li>
                        <li>                      
                            <label htmlFor="">Write organization name or full name: </label>
                        </li>
                        <li>
                            <input type="text" name="name" onChange={this.handleChange} required/>
                        </li>

                        <li>
                            <label htmlFor="">Write upholsteryType: </label>
                        </li>
                        <li>
                        <select name="upholsteryType" defaultValue={"DEFAULT"} required onChange={this.handleChange} >
                                    <option value="DEFAULT" disabled >Upholstery Type</option>
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
                        </li>

                        <li>
                            <label htmlFor="">Add image: </label>
                        </li>
                        <li>
                            <input type="file" name="image" onChange={(e)=>{this.setState({imageSelected: e.target.files[0]})}} accept="image/png, image/jpeg"/>
                        </li>
                        
                        <li>
                        <textarea 
                            name="review" 
                            className="review"
                            onChange={this.handleChange}>
                        </textarea>
                        </li>
                        <li>
                            <button className="btn-1">Submit</button>
                        </li>
                    </ul>
                </form>
            </div>
        )
    }
}

export default Reviews