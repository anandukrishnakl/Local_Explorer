import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css";

const ActivitySuggestions = ({ location }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [previousSuggestions, setPreviousSuggestions] = useState([]);

    const fetchActivities = async (isResuggest = false) => {
        if (!location) return;

        setLoading(true);

        try {
            const { data } = await axios.get("http://127.0.0.1:7777/suggest-activity/", {
                params: { location, user_input: "Suggest Activities" },
            });

            let activities = data.activities.filter(activity => !previousSuggestions.includes(activity));
            if (activities.length === 0) activities = data.activities;

            setMessages([{ text: activities.join("\n• "), sender: "bot" }]);
            setPreviousSuggestions(activities);
        } catch {
            setMessages([{ text: "Error fetching suggestions. Try again!", sender: "bot" }]);
        }

        setLoading(false);
    };

    return (
        <div className="chat-container">
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.sender}`}>
                        <ul style={{ textAlign: "left", paddingLeft: "20px" }}>
                            {msg.text.split("•").map((activity, idx) => 
                                activity.trim() && <li key={idx}>{activity.trim()}</li>
                            )}
                        </ul>
                    </div>
                ))}
                {loading && <div className="chat-message bot">Thinking...</div>}
            </div>

            <div className="chat-buttons">
                <button className="suggest-activity-btn" onClick={() => fetchActivities(false)}>Suggest Activity</button>
                <button className="resuggest-btn" onClick={() => fetchActivities(true)}>Resuggest</button>
            </div>
        </div>
    );
};

export default ActivitySuggestions;
