import React from "react";
import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";
import GetStartedFloating from "../components/GetStartedFloating";
import Hero from "../components/Hero";
import InfoPage from "../components/InfoPage";
import Reviews from '../components/Reviews'

export default function HomeScreen() {
    return (
    <div>
        <Hero />
        <InfoPage />
        <AboutUs />
        <Reviews />
        <Footer />
        <GetStartedFloating />
    </div>
)
}