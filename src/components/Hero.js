import React from 'react'
import { Link} from "react-router-dom";


const Hero = () => {
    return (
        <div className="hero">
            <div className="hero-left">
            <hr />
                <ul>
                    <li>
                        <div className="hero-head"><h6>Carpet and Upholstery Cleaning Never Seen Before.</h6></div> 
                    </li>
                    <li className="hero-btn-cont">
                        <Link className="btn-1" to="/useform"><button id="get-started-btn">Get Started</button></Link>
                        <a className="see-our-work" href="https://www.facebook.com/100058473835975">See our work</a>
                    </li>
                </ul>
                <hr />
            </div>
            <div className="hero-right">
                <img src="./images/hero-image.jpg" alt="hero-img"></img>
            </div>
            <div className="pointer-icon">
                <img src="./images/icons/icons8-finger-up-100.png" alt=""></img>
            </div>
        </div>
    )
}

export default Hero
