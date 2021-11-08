import React, { Component } from 'react'
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from 'react-icons/fa'

export default class ourLatestWork extends Component {
    state = {
        imageNumber: 0, 
        counter: 3,
        image: [
            {image: "./images/info-sofa.jpg"},{image: "./images/info-carpet.jpg"},{image: "./images/info-other.jpg"}
        ],
        transition: ""
    }
    trans = (e) => {
        this.setState({transition: "transition-fade"})        
    }
    prev = () => {
        if (this.state.imageNumber === 0) {
            this.setState({imageNumber: this.state.counter -1})
            this.trans()
        }else{
            this.setState({imageNumber: this.state.imageNumber - 1})
            this.trans()
        }
    }
    next = () => {
        if (this.state.imageNumber === this.state.counter - 1) {
            this.setState({imageNumber: 0})
            this.trans()

        }else{
            this.setState({imageNumber: this.state.imageNumber + 1})
            this.trans()
        }
    }
    setCounter = () => {
        this.setState({counter: this.state.image.length})
    }
    componentDidMount(){
        this.setCounter()
    }

    render() {
        return (
            <div className="carousel-cont">
                <h1>Our Latest Jobs!</h1>
                <ul>
                    <FaArrowAltCircleLeft className="carousel-arrow" onClick={this.prev} size={60}/>
                    <li className = {`${this.state.transition} ${"carousel-item"}`} onAnimationEnd={() => {this.setState({transition: ""})}} >
                        <div className="left" onDragEnter={this.prev}></div>
                        <div className="right" onDragEnter={this.next}></div>

                        <div className="carousel-img-cont" draggable={true}>
                            <img src={this.state.image[this.state.imageNumber].image} alt="" /> 
                        </div>
                        <div className="carousel-head">
                            <h1><a href="#reviews">Write a Review</a></h1>
                        </div>                               
                    </li>
                    <FaArrowAltCircleRight className="carousel-arrow" onClick={this.next} size={60}/>
                </ul>
            </div>
        )
    }
}
