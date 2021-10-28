import Aos from 'aos';
import React, { useEffect } from 'react'

const Footer = () => {
    useEffect(() => {
        Aos.init({
            offset:1,
            duration:1000
        });
        Aos.refresh();
      });
    return (
    <div className="footer">
        <div className="left-foot"  data-aos="fade-right">
            <div className="copyright-tag">
                © DTDCarpets LLC
            </div>
            <div className="contact">
                <ul>
                    <li>TELEPHONE: <span>(954)991-2338</span></li>
                    <li>EMAIL: <span>dtdcarpet@gmail.com</span></li>
                </ul>
            </div>
        </div>
        <div className="right-foot" data-aos="fade-right">
            <ul>
                <li id="3"><a href="https://www.facebook.com/100058473835975"><img src="./images/icons/icons8-facebook-480.png" alt="" /></a></li>
                <li id="4"><a href="https://wa.me/19549912338"><img src="./images/icons/icons8-whatsapp-512.png" alt="" /></a></li>
            </ul>
        </div>
    </div>
    )
}

export default Footer
