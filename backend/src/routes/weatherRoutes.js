import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const BASE_URL=process.env.BASE_URL;
const API_KEY=process.env.API_KEY;

router.get("/", async (req, res) => {
    const city = req.query.city || 'patna'; // Default to patna if no city provided
    try {
        const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${city}&days=5&aqi=no&alerts=yes`);
        
        // Format the response data
        const weatherData = {
            location: {
                name: response.data.location.name,
                region: response.data.location.region,
                country: response.data.location.country
            },
            current: {
                temp_c: response.data.current.temp_c,
                humidity: response.data.current.humidity,
                condition: response.data.current.condition.text,
                icon: response.data.current.condition.icon
            },
            forecast: response.data.forecast.forecastday.map(day => ({
                date: day.date,
                maxTemp: day.day.maxtemp_c,
                minTemp: day.day.mintemp_c,
                avgTemp: day.day.avgtemp_c,
                humidity: day.day.avghumidity,
                condition: day.day.condition.text,
                icon: day.day.condition.icon,
                chanceOfRain: day.day.daily_chance_of_rain,
                rainfall: day.day.totalprecip_mm
            }))
        };
        console.log(weatherData);
        res.json(weatherData);
    } catch (err) {
        console.error("Error details:", err.response?.data || err.message);
        res.status(500).json({ 
            error: "Failed to fetch weather data",
            message: err.response?.data?.error?.message || "Please try again"
        });
    }
});

export default router;