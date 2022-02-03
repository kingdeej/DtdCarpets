import React from "react";
import { useEffect } from "react";
import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import InfoPage from "../components/InfoPage";
import Reviews from '../components/Reviews'

export default function HomeScreen() {
    useEffect(() => {
        localStorage.clear();
    });
    
    return (
    <div>
        <Hero />
        <InfoPage />
        <AboutUs />
        <Reviews />
        <Footer />
    </div>
)
}