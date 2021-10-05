import Axios from 'axios';
import { FaStar } from 'react-icons/fa'
import React, { Component } from 'react';
import { Image } from 'cloudinary-react'


export class ReviewScreen extends Component {
    state = {
        reviews: [],
        revImageCont: "show",
        revList:"",
        revListId: ""
    }
    toggleRevList = (e) => {
        this.setState({revImageCont: "show"});
        this.setState({revList: ""});
    }
    toggleRevImg = (e) => {
        this.setState({revList: "show"});
        this.setState({revImageCont: ""});
    }
    
    componentDidMount(){
        Axios.get('https://us-central1-dtdcarpets.cloudfunctions.net/dtdCarpets/reviews').then((response)=>{
            this.setState({reviews: response.data})
        })
    }
    
    render() {
        return (
            <div >
                <div className="review-page-cont">
                    <h1 className="show">Reviews</h1>
                    {this.state.reviews.map((val, key)=>{
                        if(val.review === ""){
                            val.review = "No Review"
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
                                        <h2>Rating: </h2>
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
                                        <Image cloudName="asfsquidy" style={{width: 100}} publicId={val.imageId} className="image"
                                        id={val.imageId} onClick={()=>{ 
                                            const reviewObj = document.getElementById(val.imageId)
                                            const reviewId = reviewObj.id
                                            this.setState({revListId: reviewId})
                                            this.toggleRevImg()}}
                                        />
                                        <Image cloudName="asfsquidy" style={{width: 100, height: 100}} publicId={val.imageId1} className="image"
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
                                
                                <div className={this.state.revImageCont}><button className="review-btn" onClick={this.toggleRevList}>Back</button></div>
                            </div>
                                
                        )
                    })}
                </div>
                <div className={`rev-img-parent ${this.state.revImageCont}`}>
                    <div className="review-img-cont">
                        <Image cloudName="asfsquidy"  publicId={this.state.revListId} className="rev-img" />
                    </div>
                </div>
                <div className={`rev-img-parent show ${this.state.revImageCont}`}>
                    <div className="review-img-cont">
                        <Image cloudName="asfsquidy"  publicId={this.state.revListId} className="rev-img" />
                    </div>
                </div>
            </div>
        )
    }
}

export default ReviewScreen
