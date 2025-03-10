import React, { useEffect, useRef } from "react";

const MapComponent = ({ location }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        if (!window.google || !window.google.maps || !location) return;

        const map = new window.google.maps.Map(mapRef.current, {
            center: { lat: location.lat, lng: location.lng },
            zoom: 12,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
            zoomControl: true,
        });

        const marker = new window.google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map,
            title: "Your Current Location",
        });

        if (!window.google.maps.places) return;

        const input = document.createElement("input");
        Object.assign(input.style, {
            position: "absolute",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: "1000",
            width: "300px",
            padding: "10px",
            fontSize: "14px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.3)",
            backgroundColor: "white",
        });

        input.type = "text";
        input.placeholder = "Search for an activity location...";
        map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(input);

        const searchBox = new window.google.maps.places.SearchBox(input);

        searchBox.addListener("places_changed", () => {
            const places = searchBox.getPlaces();
            if (places.length === 0 || !places[0].geometry) return;

            const place = places[0];
            map.setCenter(place.geometry.location);
            map.setZoom(15);
            marker.setPosition(place.geometry.location);
            marker.setTitle(place.name);
        });
    }, [location]);

    return (
        <div style={{ width: "100%", height: "450px", position: "relative" }}>
            <div ref={mapRef} style={{ width: "100%", height: "100%", borderRadius: "10px", marginTop: "20px" }} />
        </div>
    );
};

export default MapComponent;
