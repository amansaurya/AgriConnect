
import React, { useState } from "react";
import SearchBox from "./searchBox";
import InfoBox from "./infoBox";
import Navbar from "./navbar";
import Footer from "./footer";
import "./weatherApp.css";

export default function WeatherApp() {
    const [weatherInfo, setWeatherInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateInfo = async (newInfo) => {
        try {
            setIsLoading(true);
            setError(null);
            
            // Format the weather data correctly based on API response
            const formattedInfo = {
                location: newInfo.location,
                current: newInfo.current,
                forecast: newInfo.forecast // Already in the correct format
            };
    
            setWeatherInfo(formattedInfo);
            console.log('Formatted Weather Info:', formattedInfo);
        } catch (err) {
            setError("Failed to fetch weather data");
            console.error("Error updating weather info:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="weather-app">
                <h1>Weather Forecast</h1>
                <SearchBox updateInfo={updateInfo} />
                {isLoading ? (
                    <div className="loading">Loading weather data...</div>
                ) : error ? (
                    <div className="error">{error}</div>
                ) : (
                    <InfoBox info={weatherInfo || { forecast: [] }} />
                )}
            </div>
            <Footer />
        </>
    );
}