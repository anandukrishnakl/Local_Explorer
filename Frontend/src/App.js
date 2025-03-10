import React, { useState, useEffect } from "react";
import axios from "axios";
import ActivitySuggestions from "./components/ActivitySuggestions";
import MapComponent from "./components/MapComponent";
import "./index.css";

const App = () => {
    const [location, setLocation] = useState(null);
    const [weather, setWeather] = useState(null);
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        getUserLocation();
    }, []);

    const getUserLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async ({ coords }) => {
                    const { latitude: lat, longitude: lon } = coords;
                    try {
                        const { data } = await axios.get(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
                        );
                        const city = data.address.city || data.address.town || data.address.village;
                        const country = data.address.country;
                        setLocation({ city, country, lat, lon });

                        fetchWeather(city);
                        fetchLocalTime(lat, lon);
                    } catch (error) {
                        setLocation({ city: "Unknown", country: "Unknown", lat, lon });
                    }
                },
                () => setLocation({ city: "Unknown", country: "Unknown", lat: 48.8566, lon: 2.3522 })
            );
        }
    };

    const fetchWeather = async (city) => {
        try {
            const { data } = await axios.get(`http://127.0.0.1:7777/weather/${city}`);
            setWeather(data);
        } catch {}
    };

    const fetchLocalTime = async (lat, lon) => {
        try {
            const { data } = await axios.get(
                `https://api.timezonedb.com/v2.1/get-time-zone?key=JMQPRYTB4LRE&format=json&by=position&lat=${lat}&lng=${lon}`
            );
            setCurrentTime(data.formatted);
        } catch {
            setCurrentTime("Time not available");
        }
    };

    return (
        <div className="app-container">
            <h1>🗺️ Local Explorer 🗺️</h1>
            {location && (
                <h3>
                    Location: {location.city}, {location.country} <br />
                    Local Time: {currentTime || "Fetching..."}
                </h3>
            )}

            <div className="weather-container">
                <h3 style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#000", padding: "10px", borderRadius: "10px", color: "white", fontSize: "18px" }}>
                    Weather in {location?.city}: 
                    {weather?.temperature && weather?.description ? (
                        <>
                            <span>{weather.temperature}, {weather.description}</span>
                            {weather.icon && <img src={weather.icon} alt="Weather icon" style={{ width: "32px", height: "32px", verticalAlign: "middle" }} />}
                        </>
                    ) : " Loading..."}
                </h3>
            </div>

            <ActivitySuggestions weather={weather} location={location?.city} />

            {location && <MapComponent location={{ lat: location.lat, lng: location.lon }} />}
        </div>
    );
};

export default App;
