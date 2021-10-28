import React, {useEffect} from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';

const InfoPage = () => {
    useEffect(() => {
        AOS.init({
            offset: 300,
            duration: 1000
        });
        AOS.refresh();
      });
    return (
    <div className="info-page cont-spacing">
        <div className="info-page-container">
            <div className="info-header">
                <div className="info-page-header">
                    <h1>
                        WE DO...
                    </h1>
                </div>
                <ul>
                    <li>
                        <div className="tile-cont" id="tile-1" data-aos="fade-right">
                            <div className="tile-img">
                                <img src="./images/info-carpet.jpg" alt=""></img>
                                <div className="img-title">CARPETS AND RUGS</div>
                            </div>                   
                            <div className="tile-info">CARPETS AND RUGS ARE PRICED BASED ON SIZE</div>
                        </div>
                    </li>
                    <li>
                        <div className="tile-cont" id="tile-2" data-aos="fade-right">                        
                            <div className="tile-info" id="tile-info2">SOFAS AND CHAIRS ARE PRICED BASED ON SIZE</div>
                            <div className="tile-img">
                                <img src="./images/info-sofa.jpg" alt=""></img>
                                <div className="img-title">SOFAS AND CHAIRS</div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="tile-cont" data-aos="fade-right">
                            <div className="tile-img">
                                <img src="./images/info-other.jpg" alt=""></img>
                                <div className="img-title">SPECIAL DEMANDS</div> 
                            </div>
                            <div className="tile-info">FABRIC BASED MATERIALS ONLY!!</div>
                         </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    )
}

export default InfoPage
