import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class ThankYou extends Component {
    render() {
        const {loading, ifLoading} = this.props
        console.log(ifLoading);
        if (ifLoading) {
            return(
                <div className= "loading-cont">
                    {loading}
                </div>
            )
        }else{
            return (
                <div className="thank-you-cont">              
                    <div className="dtd-carpets">
                        <h1 className="thanks">Thank You<hr /></h1>                  
                            <p>We will get back to you with a Quote as soon as possible.</p>
                            <h3>DTD CARPETS</h3>
                        <Link to="/" ><button className="thanks-btn">Home</button> </Link>              
                    </div>
                </div>
            )            
        }

    }
}

export default ThankYou
