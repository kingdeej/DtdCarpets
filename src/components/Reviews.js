import React, { Component} from 'react'
import { FaSortDown, FaStar, FaTimes} from 'react-icons/fa'
import Axios from 'axios'
import AOS from 'aos';

export class Reviews extends Component {
    useEffect(){
        AOS.init({
            offset: 300,
            duration: 3000
        });
        AOS.refresh();
    }
    state = {
        rating: null,
        hover: null,
        review: "",
        name: "",
        email: "",
        emailConfirm:"",
        customerInfo: [],
        upholsteryType: "",
        imageSelected: "",
        imageSelected1: "",
        imageId:"",
        imageId1:"",
        id: null,
        showAlert: "show",
        showAlert1: "show",
    }
    componentDidMount(){
        Axios.get("https://us-central1-dtdcarpets.cloudfunctions.net/dtdCarpets/getReviewid").then((response)=>{
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
            Axios.get("https://us-central1-dtdcarpets.cloudfunctions.net/dtdCarpets/customers").then((response)=>{
                this.setState({customerInfo: response.data})
            })
        })

    }


    handleChange = (e) => {
        const name = e.target.name
        this.setState({[name]: e.target.value,})
        
    }
    handleSubmit = (e) => {
        e.preventDefault() 
        const result = this.state.customerInfo.find( ({email}) => email === this.state.email )
        if(this.state.rating < 1 ){
            this.setState({showAlert1: "alert"}) 
        }else{
            if (result === undefined) {
                this.setState({showAlert: "alert"})
            }else{
                if ((this.state.imageSelected === undefined || this.state.imageSelected.length === 0) && (this.state.imageSelected1 === undefined || this.state.imageSelected1.length === 0)) {
                    Axios.post("https://us-central1-dtdcarpets.cloudfunctions.net/dtdCarpets/review", {
                            id: this.state.id,
                            name: this.state.name,
                            upholsteryType: this.state.upholsteryType,
                            rating: this.state.rating,
                            review: this.state.review,
                        }).then(()=>{
                            console.log("success")
                            window.location.reload(false);   
                    })
                }
                else if (this.state.imageSelected === undefined || this.state.imageSelected.length === 0) {

                    const formData1 = new FormData()
                    formData1.append("file", this.state.imageSelected1);
                    formData1.append("upload_preset", "mxkyqztd");

                    Axios.post("https://api.cloudinary.com/v1_1/asfsquidy/image/upload", formData1).then((response)=>{
                        console.log(response)
                        this.setState({imageId1: response.data.public_id})

                        Axios.post("https://us-central1-dtdcarpets.cloudfunctions.net/dtdCarpets/review", {
                            id: this.state.id,
                            name: this.state.name,
                            upholsteryType: this.state.upholsteryType,
                            rating: this.state.rating,
                            review: this.state.review,
                            imageId1: this.state.imageId1
                        }).then(()=>{
                            console.log("success")
                            window.location.reload(false);   
                        })
                    })
                }
                else if (this.state.imageSelected1 === undefined || this.state.imageSelected1.length === 0) {
                    const formData = new FormData();
                    formData.append("file", this.state.imageSelected);
                    formData.append("upload_preset", "mxkyqztd");

                    Axios.post("https://api.cloudinary.com/v1_1/asfsquidy/image/upload", formData).then((response)=>{
                    console.log(response)
                    this.setState({imageId: response.data.public_id})

                        Axios.post("https://us-central1-dtdcarpets.cloudfunctions.net/dtdCarpets/review", {
                            id: this.state.id,
                            name: this.state.name,
                            upholsteryType: this.state.upholsteryType,
                            rating: this.state.rating,
                            review: this.state.review,
                            imageId: this.state.imageId,
                            }).then(()=>{
                                console.log("success")
                                window.location.reload(false);   
                            })
                        })
                }
                else if(this.state.imageSelected.name.length > 0 && this.state.imageSelected1.name.length) {
                    
                    const formData = new FormData();
                    formData.append("file", this.state.imageSelected);
                    formData.append("upload_preset", "mxkyqztd");

                    const formData1 = new FormData()
                    formData1.append("file", this.state.imageSelected1);
                    formData1.append("upload_preset", "mxkyqztd");
            
                    Axios.post("https://api.cloudinary.com/v1_1/asfsquidy/image/upload", formData).then((response)=>{
                        console.log(response)
                        this.setState({imageId: response.data.public_id})

                        Axios.post("https://api.cloudinary.com/v1_1/asfsquidy/image/upload", formData1).then((response)=>{
                            console.log(response)
                            this.setState({imageId1: response.data.public_id})

                            Axios.post("https://us-central1-dtdcarpets.cloudfunctions.net/dtdCarpets/review", {
                                id: this.state.id,
                                name: this.state.name,
                                upholsteryType: this.state.upholsteryType,
                                rating: this.state.rating,
                                review: this.state.review,
                                imageId: this.state.imageId,
                                imageId1: this.state.imageId1
                            }).then(()=>{
                                console.log("success")
                                window.location.reload(false);   
                            })
                        })
                    })
                }
            }
        }
    }
      
    render(){
        
        return (
            <div className="rev-container" data-aos="fade-up">
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
                            <label htmlFor="">Write email address: </label>
                        </li>
                        <li>
                            <input type="email" name="email" onChange={this.handleChange} required/>
                        </li>

                        <li>
                            <label htmlFor="">Write upholsteryType: </label>
                        </li>
                        <li>
                            <div>
                                <select name="upholsteryType" defaultValue={this.state.upholsteryType} required onChange={this.handleChange} >
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
                        </li>

                        <li>
                            <label className="add-images" htmlFor="">Add 2 images: </label>
                        </li>
                        <li>
                            <label htmlFor="">Before: </label>
                        </li>
                        
                        <li>
                            <input type="file"  name="image" onChange={(e)=>{this.setState({imageSelected: e.target.files[0]})}} accept="image/png, image/jpeg"/>
                        </li>
                        <li>
                            <label htmlFor="">After: </label>
                        </li>
                        <li>
                            <input type="file" name="image" onChange={(e)=>{this.setState({imageSelected1: e.target.files[0]})}} accept="image/png, image/jpeg"/>
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
                <div className={`${this.state.showAlert}`}><h5>Email does not match</h5> <span className="times" onClick={()=>{this.setState({showAlert: "show"})}}><FaTimes /></span></div>
                <div className={`${this.state.showAlert1}`}><h5>Please Enter a Rating</h5> <span className="times" onClick={()=>{this.setState({showAlert1: "show"})}}><FaTimes /></span></div>
            </div>
        )
    }
}

export default Reviews