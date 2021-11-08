import React from "react";
import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";
import GetStartedFloating from "../components/GetStartedFloating";
import Hero from "../components/Hero";
import InfoPage from "../components/InfoPage";
import OurLatestWork from "../components/OurLatestWork";
import Reviews from '../components/Reviews'

export default function HomeScreen() {
    return (
    <div>
        <Hero />
        <OurLatestWork />
        <InfoPage />
        <Reviews />
        <AboutUs />
        <Footer />
        <GetStartedFloating />
    </div>
)
}