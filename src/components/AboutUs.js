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
    <div className="about-us cont-spacing" id="about-us">
        <div className="about-us-h"  data-aos="fade-up">
            <h1> ABOUT US </h1> 
        </div>
        <p  data-aos="fade-up">DTD Carpets LLC is a team consisting of reliable, efficient and determined members who are devoted to only quality carpet and upholstery cleaning service. 
            We clean fabric based materials like carpets, rugs, sofas, chairs, ottoman, bar stools, counter stools etc. </p>
        <p  data-aos="fade-up"> We provide our services in the Emerald coast area located in Florida, USA.</p>
    </div> 
    )
}

export default AboutUs
