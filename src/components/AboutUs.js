import Aos from 'aos';
import React, { useEffect } from 'react'

const AboutUs = () => {
    useEffect(() => {
        Aos.init({
            offset:200,
            duration:1000
        });
        Aos.refresh();
      });
    return (
    <div className="about-us cont-spacing" id="about-us" data-aos="fade-up">
        <div className="about-us-h">
            <h1> ABOUT US </h1> 
        </div>
        <p>DTD Carpets LLC is a team consisting of reliable, efficient and determined members who are devoted to only quality carpet and upholstery cleaning service. 
            We clean fabric based materials like carpets, rugs, sofas, chairs, ottoman, bar stools, counter stools etc. </p>
        <p> We provide our services in the Emerald coast area located in Florida, USA.</p>
    </div> 
    )
}

export default AboutUs
