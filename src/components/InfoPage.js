import React, {useEffect} from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const InfoPage = () => {
    useEffect(() => {
        AOS.init({
            offset: 300,
            duration: 1000
        });
        AOS.refresh();
      });      
    return (
    <div className="info-page">
        <div className="info-page-container">
            <div className="info-header">
                <div className="info-page-header">
                    <h1>
                        WE DO...
                    </h1>
                </div>
                <ul className="info-cont-ul">
                    
                    <li>
                        <div className="tile-cont" id="tile-1">    
                        <ul className="tile-cont-ul">
                            <li>
                                <div className="tile-img">
                                    <img src='./images/info-chair-dirty.jpg' id='1' alt=""></img>
                                    <img src='./images/info-chair-clean.jpg' id='1' alt=""></img>
                                </div>
                                <div className="img-title">SOFAS AND CHAIRS</div>
                            </li>
                            <li>
                                <div>
                                    <h5>PRICED BASED ON:</h5>
                                    <hr className="pink"/>
                                </div>
                                <div className="based-on-cont">
                                    <ul>
                                        <li>
                                            <div className="based-on">size</div>
                                            <div className="based-on">color</div>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <hr className="tile-cont-hr" />
                            </li>
                            <li>
                                <p className="tile-text">Prices vary based on the size and the color of the sofas and chairs. You can request for us to deep clean or spot clean upholstery which influences pricing.</p>
                            </li>
                            <li>
                                <div><Link to="/useform"><button> Get Started</button></Link></div>
                                <div>
                                    <button><a href="tel:9549912338">Call Us Now...</a> </button>
                                </div>
                            </li>
                        </ul>                    
                        </div>
                    </li>
                    <li>
                        <div className="tile-cont" id="tile-2">
                            <ul>
                                <li>
                                    <div className="tile-img">
                                        <img id='2' src={`./images/info-carpet-dirty.jpg`} alt=""></img>
                                        <img id='2' src={`./images/info-carpet-clean.jpg`} alt=""></img>
                                    </div> 
                                    <div className="img-title">CARPETS AND RUGS</div>
                                </li>
                                <li>
                                    <div>
                                        <h5>PRICED BASED ON:</h5>
                                        <hr className="pink"/>
                                    </div>
                                    <div className="based-on-cont">
                                        <ul>
                                            <li>
                                                <div className="based-on">size</div>
                                                <div className="based-on">color</div>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <hr className="tile-cont-hr" />
                                </li>
                                <li>
                                    <p className="tile-text">Prices vary based on the size and the color of the carpets and rugs. You can request for us to clean carpets and rugs around you're furniture, if the furniture is already moved or for us to move the furniture, but the price will increase.</p>
                                </li>
                                <li>
                                    <div>
                                        <Link to="/useform"><button> Get Started</button></Link>
                                    </div>
                                    <div>
                                        <button><a href="tel:9549912338">Call Us Now...</a></button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div className="tile-cont" id="tile-3">
                            <ul>
                                <li>
                                    <div className="tile-img">
                                        <img src="./images/info-other.jpg" alt=""></img>
                                        <img src="./images/info-other.jpg" alt=""></img>
                                    </div>
                                    <div className="img-title">SPECIAL DEMANDS</div> 
                                </li>
                                <li>
                                    <div>
                                        <h5>PRICED BASED ON:</h5>
                                        <hr className="pink"/>    
                                    </div>
                                    
                                    <div className="based-on-cont">
                                        <ul>
                                            <li>
                                                <div className="based-on">Material</div>
                                                <div className="based-on">?</div>
                                                <div className="based-on">?</div>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <hr className="tile-cont-hr" />
                                </li>
                                <li>
                                    <p>Prices are based on the material and uniqueness.</p>
                                </li>
                                <li>
                                    <div><Link to="/useform"><button> Get Started</button></Link></div>
                                    <div><button><a href="tel:9549912338">Call Us Now...</a></button></div>
                                </li>
                            </ul>
                         </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    )
}

export default InfoPage
