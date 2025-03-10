import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ location, setWeather }) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (location) fetchWeather(location);
    }, [location]);

    const fetchWeather = async (city) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://127.0.0.1:5000/weather/${city}`);
            setWeather(response.data);
        } catch (error) {
            console.error("Error fetching weather:", error);
        }
        setLoading(false);
    };

    return (
        <div>
            {loading ? <p>Loading weather...</p> : <p>Weather in {location}: {setWeather?.temperature}°C, {setWeather?.description}</p>}
        </div>
    );
};

export default Weather;
