import Axios from 'axios';
import { FaCheck, FaStar} from 'react-icons/fa'
import React, { Component } from 'react';
import { Image } from 'cloudinary-react';
import Loading from '../components/Loading';
import Error from '../components/Error';
import deletes from '../images/delete.png';



export class ReviewAdmin extends Component {
    _isMounted = false
    state = {
        reviews: [],
        revImageCont: "show",
        revList:"",
        revListId: "",
        showImg: "",
        loading: <Loading />,
        error: null,
        showQuestion: 'show',
        id: null
    }
    toggleRevList = (e) => {
        this.setState({revImageCont: "show"});
        this.setState({revList: ""});
    }
    toggleRevImg = (e) => {
        this.setState({revList: "show"});
        this.setState({revImageCont: ""});
    }
    
    getReviews = () => {
        this.setState({loading: <Loading />})
        this.setState({error: null})
        //set reviews to local storage       
        setTimeout(() => {
            Axios.get('https://us-central1-dtdcarpets.cloudfunctions.net/dtdCarpets/reviews')
            .then((response)=>{
                this.setState({reviews: response.data})
                // if data is fetched successfully
                if (response.status !== 200) {
                    //error and loading
                    this.setState({loading: null})
                    this.setState({error: <Error refresh = {this.getReviews}/>})
                }
            })
            //if error
            .catch(err =>{
                this.setState({loading: null})
                this.setState({error: <Error refresh = {this.getReviews}/>})
                console.log(err.message);
            })
            
        }, 1000);
        clearTimeout(this.getReviews)
    }
    deleteReview = (e) => {
        Axios.delete(`https://us-central1-dtdcarpets.cloudfunctions.net/dtdCarpets/delete-review/${this.state.id}`, {
            id: this.state.id
        }).then((response)=>{
            this.setState({reviews: this.state.reviews.filter((val)=>{
                return JSON.stringify(val.id) !== this.state.id;
            })})
            this.setState({showQuestion: "show"}) 
        }).catch((error)=>{
            console.log(error);
        })
      console.log(e.target.id);
    };
    //are you sure
    areYouSure = (e) => {
      this.setState({id: e.target.id}) 
      this.setState({showQuestion: ""}) 
    };
    
    componentDidMount(){
        this._isMounted = true;
        if (this._isMounted) {
            this.getReviews();
        }
        localStorage.clear()
    }
    componentWillUnmount(){
        this.setState = (state , callback) =>{
            return;
        }

    }

    
    render() {
        const ReviewNon = (params) => {
            if (this.state.reviews === []) {
                return <h1>No Reviews Yet</h1>
            }else{
                return <h1>Reviews</h1>
                
            }
        } 
        return (
            <div>
                <div className="review-page-cont">
                    <ReviewNon />
                    {this.state.error}
                    {!this.state.reviews.length ?  this.state.loading : null }
                    {this.state.reviews.map((val, key)=>{
                        if(val.review === ""){
                            val.review = "No Reviews"
                        }
                        if (val.imageId1 === null) {
                            val.imageId1 = "show"
                        }
                        if (val.imageId === null) {
                            val.imageId = "show"
                        }
                        return (
                            <div key={key} className="rev-page">
                                <ul className={this.state.revList}>
                                    <li>
                                        <h2>Name: </h2>
                                        <p>{val.name}</p>
                                    </li>
                                    <li>
                                        <h2>UpholsteryType: </h2>
                                        <p>{val.upholsteryType}</p>
                                    </li>
                                    <li>
                                        <h2>Rating: {val.verified === 1 ? <FaCheck size={10} /> : null} </h2>
                                        <p>{[...Array(5)].map((star, i)=>{
                                            const value = val.rating
                                            const ratingValue = i + 1
                                            return <FaStar 
                                            key={i}
                                            value={ratingValue}
                                            color={ratingValue <= value ? "orange":"gray"}
                                            />
                                        })}</p>
                                    </li>
                                    <li className="review-img-container">
                                        <Image cloudName="asfsquidy" style={{width: 100}} publicId={val.imageId} className={`image ${val.imageId} `}
                                        id={val.imageId} onClick={()=>{ 
                                            const reviewObj = document.getElementById(val.imageId)
                                            const reviewId = reviewObj.id
                                            this.setState({revListId: reviewId})
                                            this.toggleRevImg()}}
                                        />
                                        <Image cloudName="asfsquidy" style={{width: 100, height: 100}} publicId={val.imageId1} className={`image ${val.imageId1} `}
                                        id={val.imageId1} onClick={()=>{ 
                                            const reviewObj = document.getElementById(val.imageId1)
                                            const reviewId = reviewObj.id
                                            this.setState({revListId: reviewId})
                                            this.toggleRevImg()}}
                                        />
                                    </li>

                                    <li>
                                        <h2>Review: </h2>
                                        <p>{val.review}</p>
                                    </li>
                                </ul>
                                <img src={deletes} alt="delete" style={{width: "30px", cursor: 'pointer'}} id={val.id} onClick={this.areYouSure}/>
                            </div>                               
                        )
                    })}
                </div>

                <div className={`rev-img-parent ${this.state.revImageCont}`}>
                    <div className="review-img-cont">
                        <Image cloudName="asfsquidy"  publicId={this.state.revListId} className="rev-img" />
                    </div>
                    <div className={this.state.revImageCont}><button className="review-btn" onClick={this.toggleRevList}>Back</button></div>
                </div>
                <div className={`rev-img-parent show ${this.state.revImageCont}`}>
                    <div className="review-img-cont">
                        <Image cloudName="asfsquidy"  publicId={this.state.revListId} className="rev-img" />
                    </div>
                    <div className={this.state.revImageCont}><button className="review-btn" onClick={this.toggleRevList}>Back</button></div>
                </div>
                {/*are you sure*/}
                <div className={`${this.state.showQuestion} delete-question-cont`}>
                    <div className='delete-question'>
                        <h3>Are You sure you want to delete this review</h3>
                        <ul>
                            <li><button onClick={()=>{this.setState({showQuestion: "show"})}} >No</button></li>
                            <li><button onClick={this.deleteReview} >Yes</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default ReviewAdmin
