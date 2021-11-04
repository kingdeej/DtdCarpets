import React from "react";
import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import InfoPage from "../components/InfoPage";
import Reviews from '../components/Reviews'
import "../styles/HomeScreen/HomeScreen.css"

export default function HomeScreen() {
    return (
    <div>
        <Hero />
        <InfoPage />
        <Reviews />
        <AboutUs />
        <Footer />
    </div>
)
}