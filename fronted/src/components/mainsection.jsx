import React, { useEffect } from "react";

const MainSection = ({ city }) => {
    const API_URL = "/api/weather/w";

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetch(`${API_URL}?city=${city}`);
                const data = await response.json();
                console.log("Weather data from backend:", data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        if (city) {
            fetchWeatherData();
        }
    }, [city]);

    return null; // No UI elements needed
};

export default MainSection;
