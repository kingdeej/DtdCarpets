import React from 'react'

const InfoPage = () => {
    return (
    <div className="info-page cont-spacing">
        <div className="info-page-container">
            <div className="tile-cont" id="tile-3">
                <div className="tile-img"><div className="img"><img src="./images/info-other.jpg" alt=""></img></div></div>     
                <div className="img-title">SPECIAL DEMANDS<br/> 
                    <span>FABRIC BASED MATERIALS ONLY!!</span>
                </div>
            </div>
            <div className="info-header">
                <div className="info-page-header">
                    <h1>
                        WE DO...
                    </h1>
                </div>
                <ul>
                    <li>
                        <div className="tile-cont" id="tile-1">
                            <div className="tile-img">
                                <img src="./images/info-carpet.jpg" alt=""></img>
                                <div className="img-title">CARPETS AND RUGS</div>
                            </div>                   
                            <div className="tile-info">CARPETS AND RUGS ARE PRICED BASED ON SIZE</div>
                        </div>
                    </li>
                    <li>
                        <div className="tile-cont" id="tile-2">                        
                            <div className="tile-info" id="tile-info2">SOFAS AND CHAIRS ARE PRICED BASED ON SIZE</div>
                            <div className="tile-img">
                                <img src="./images/info-sofa.jpg" alt=""></img>
                                <div className="img-title">SOFAS AND CHAIRS</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    )
}

export default InfoPage
