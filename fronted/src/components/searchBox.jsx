
import React from "react";
import { useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "./searchBox.css";

export default function SearchBox({ updateInfo }) {
    const [city, setCity] = useState("");
    const [error, setError] = useState(false);
    // const weather_api_url=import.meta.env.VITE_WEATHER_API_URL;

const getWeatherInfo = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_WEATHER_API_URL}${city}`);
        // console.log('API Response:', response.data); 
        return response.data; 
    } catch (error) {
        console.error("Error fetching weather:", error);
        throw error;
    }
};

    const handleChange = (event) => {
        setCity(event.target.value);
        setError(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newInfo = await getWeatherInfo();
            updateInfo(newInfo);
            setCity("");
        } catch (err) {
            setError(true);
        }
    };

    return (
        <div className="search-box">
            <form onSubmit={handleSubmit}>
                <TextField
                    id="city"
                    label="Enter City Name"
                    variant="outlined"
                    value={city}
                    onChange={handleChange}
                    error={error}
                    helperText={error ? "City not found" : ""}
                    required
                    sx={{ 
                        width: '300px',
                        marginRight: '10px'
                    }}
                />
                <Button 
                    variant="contained" 
                    type="submit"
                    sx={{
                        height: '56px',
                        marginTop: '0px'
                    }}
                >
                    Search
                </Button>
            </form>
        </div>
    );
}
