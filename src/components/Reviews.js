import React, { Component} from 'react'
import { FaPlus, FaSortDown, FaStar, FaTimes} from 'react-icons/fa'
import Axios from 'axios'
import AOS from 'aos';
import Loading from './Loading';
import Error from './Error';

export class Reviews extends Component {
    _isMounted = false;
    useEffect(){
        AOS.init({
            offset: 300,
            duration: 3000
        });
        AOS.refresh();
    }
    state = {
        step: 1,
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
        imageUrl: "",
        imageUrl1: "",
        imageId:"",
        imageId1:"",
        id: null,
        showAlert: "show",
        showAlert1: "show",
        transform: '',
        loading: false,
    }

    handleChange = (e) => {
        const name = e.target.name
        this.setState({[name]: e.target.value,})
    }
    handleSubmit = (e) => {
        e.preventDefault() 
        setTimeout(() => {
            Axios.get("https://us-central1-dtdcarpets.cloudfunctions.net/dtdCarpets/getReviewid").then((response)=>{
                const data = response.data
                this.setState({id: data[0]["MAX(id)"]})
                if(isNaN(this.state.id)){
                    this.setState({id: 1})
                }else{
                    this.setState({id: this.state.id + 1})
                    console.log(this.state.id);
                }
                if (response.status !== 200) {
                    this.setState({step: 4})
                }
                if (response.status === 200){
                    Axios.get("https://us-central1-dtdcarpets.cloudfunctions.net/dtdCarpets/customers").then((response)=>{
                        this.setState({customerInfo: response.data}) 
                        if (response.status !== 200) {
                            this.setState({step: 4})
                        }else{
                            this.setState({pleaseWait: ""})
                            const result = this.state.customerInfo.find( ({email}) => email === this.state.email )
                            if(this.state.rating < 1 ){
                                this.setState({showAlert1: "alert"}) 
                            }else{
                                if (result === undefined) {
                                    this.setState({showAlert: "alert"})
                                }else{
                                    this.setState({step: 3})
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
                    }).catch((error) =>{
                        console.log(error.message);
                        this.setState({step:4})
                    })
                }
            }).catch((error) =>{
                this.setState({step:4})
            })
        },1000)
        clearTimeout(this.handleSubmit)
    }
    getImage = (e) => {
        if (e.target.value === "") {
            if (e.target.id === "before") {
                this.setState({imageSelected: undefined})
                this.setState({imageUrl: ""})
            }
            if (e.target.id === "after") {
                this.setState({imageSelected1: undefined})
                this.setState({imageUrl1: ""})
            }
        }
        
        else if (JSON.stringify(e.target.value).length > 0 ) {
            if (e.target.id === "before") {
                this.setState({imageSelected: e.target.files[0]})
                this.setState({imageUrl: URL.createObjectURL(e.target.files[0])})
            }
            if (e.target.id === "after") {
                this.setState({imageSelected1: e.target.files[0]})
                this.setState({imageUrl1: URL.createObjectURL(e.target.files[0])})
            }
        }  
    }
    nextStep = () => {
        if(this.state.rating === null ){
            this.setState({showAlert1: "alert"}) 
        }else{
            this.setState({step: 2})
            this.setState({transform: "transform-right"})
        }
    }
    previousStep = () => {
        this.setState({step: 1})
        this.setState({transform: ""})
    }
    
    
    reviewSwitch= () => {
        switch (this.state.step) {
            case 1:
                return (
                    <ul className="left-rev">
                            <div className="review-stars-cont">
                                <li className="input">
                                    <h3>Ratings: {this.state.rating} Stars</h3>
                                    <hr />
                                </li>

                                <li className="input">    
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
                            </div> 
                            <div className="review-rev-cont">         
                                <li className="input">
                                    <label htmlFor="">Write Review: </label>
                                </li>
                                <li>
                                    <textarea 
                                        value={this.state.review}
                                        placeholder='Write review here...'
                                        name="review" 
                                        className="review"
                                        onChange={this.handleChange}>
                                    </textarea>
                                </li>
                                <li>
                                    <button onClick={this.nextStep}>Next</button>
                                </li>
                            </div>       
                        </ul>
                )
            case 2:
                return(
                    <ul className="right-rev">
                            <li>
                                <label className="add-images" htmlFor="">Add 2 images: </label>
                                <hr />
                            </li>
                            <li className="image-container">         
                                <label className="image-list-cont">
                                    <label htmlFor="">Before:</label>
                                    <input type="file" id="before" name="image" onChange={this.getImage} accept="image/png, image/jpeg"/>
                                    <ul>
                                        <li>
                                            <label htmlFor="before"><FaPlus className="plus"/></label>
                                            <div></div>
                                            <img className="input-img" src={this.state.imageUrl} alt="" />
                                        </li>
                                    </ul>
                                </label>
                                
                                <label className="image-list-cont">
                                    <label htmlFor="">After:</label>
                                    <input type="file" id="after" name="image" onChange={this.getImage} accept="image/png, image/jpeg"/>
                                    <ul>
                                        <li>
                                            <label htmlFor="after"><FaPlus className="plus"/> </label>
                                            <div></div>
                                            <img className="input-img" src={this.state.imageUrl1} alt="" />
                                        </li>
                                    </ul>
                                </label>
                            </li>
                            <li className="input">                      
                                <label htmlFor="">Write organization name or full name: </label>
                                <input type="text" value={this.state.name} placeholder="Write organization name or full name" name="name" onChange={this.handleChange} required/>
                            </li>
                            <li className="input">                      
                                <label htmlFor="">Write email address: </label>
                                <input type="email" value={this.state.email} placeholder="Write email address" name="email" onChange={this.handleChange} required/>
                            </li>

                            <li className="input">
                                <label htmlFor="">Write upholsteryType: </label>
                                <div className="upholstery-type">
                                    <select name="upholsteryType" defaultValue={this.state.upholsteryType} value={this.state.upholsteryType} required onChange={this.handleChange} >
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
                            <ul>
                                <li>
                                    <button className="prev-btn" onClick={this.previousStep}>Previous</button>
                                </li>
                                <li className="submit-btn">
                                    <button onClick={this.handleSubmit}>Submit</button>
                                </li>
                            </ul>
                        </ul>
                )
                case 3:
                    return(
                        <div className="loading">
                            <Loading />
                        </div>
                    )
                case 4:
                    return(
                        <div className="loading">
                            <Error refresh = {this.handleSubmit}/>
                        </div>
                    )
            default:
        }
    }
      
    render(){
        return (
            <div className="rev-container" id="reviews">
                <form action="" onSubmit={this.handleSubmit} data-aos="fade-up">
                    <h1 className="reviews-head">Wanna Write a Review?</h1>
                    <div className="rev-cont"> 
                        {this.reviewSwitch()}
                        <hr className={this.state.transform} />
                    </div> 
                </form>
                <div className={`${this.state.showAlert}`}><h5>Email does not match</h5> <span className="times" onClick={()=>{this.setState({showAlert: "show"})}}><FaTimes /></span></div>
                <div className={`${this.state.showAlert1}`}><h5>Please Enter a Rating</h5> <span className="times" onClick={()=>{this.setState({showAlert1: "show"})}}><FaTimes /></span></div>
            </div>
        )
    }
}

export default Reviews