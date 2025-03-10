from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
WEATHER_API_KEY = "39836a608e9742c487b221019250803"

genai.configure(api_key=GEMINI_API_KEY)
GEMINI_API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def fetch_weather(city: str):
    url = f"https://api.weatherapi.com/v1/current.json?key={WEATHER_API_KEY}&q={city}"
    try:
        response = requests.get(url)
        data = response.json()

        if response.status_code != 200 or "error" in data:
            raise HTTPException(status_code=400, detail=data.get('error', {}).get('message', 'Unknown error'))

        return {
            "city": data["location"]["name"],
            "temperature": f"{data['current']['temp_c']}°C",
            "description": data["current"]["condition"]["text"],
            "icon": f"https:{data['current']['condition']['icon']}"
        }
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Weather API Error: {str(e)}")


def fetch_time(city: str):
    url = f"https://api.weatherapi.com/v1/current.json?key={WEATHER_API_KEY}&q={city}"
    try:
        response = requests.get(url)
        data = response.json()

        if response.status_code != 200 or "error" in data:
            raise HTTPException(status_code=400, detail="Could not fetch time data.")

        return data["location"]["localtime"]
    except requests.exceptions.RequestException:
        return None


@app.get("/suggest-activity/")
def suggest_activity(location: str = Query(None)):
    if not location:
        raise HTTPException(status_code=400, detail="Location is required.")

    weather_data = fetch_weather(location)
    local_time = fetch_time(location)

    if not weather_data or not local_time:
        raise HTTPException(status_code=400, detail="Could not fetch weather or time for the location.")

    try:
        weather = weather_data["description"]
        local_hour = int(local_time.split(" ")[1].split(":")[0])

        time_of_day = (
            "morning" if 6 <= local_hour < 12 else
            "afternoon" if 12 <= local_hour < 18 else
            "evening"
        )

        prompt = (
            f"In {location}, the weather is {weather}, and it's {time_of_day}. "
            "List exactly 10 fun activities to do. Use sentence case. "
            "Only return activity names, nothing else. Example:\n"
            "• Activity 1\n• Activity 2\n• Activity 3"
        )

        payload = {"contents": [{"parts": [{"text": prompt}]}]}
        headers = {"Content-Type": "application/json"}

        response = requests.post(GEMINI_API_URL, headers=headers, data=json.dumps(payload))
        response_data = response.json()

        generated_text = response_data.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")

        if not generated_text:
            raise HTTPException(status_code=500, detail="AI Response is empty.")

        activities = [f"• {line.strip().lstrip('• ').capitalize()}" for line in generated_text.split("\n") if line.startswith("•")]

        return {"activities": activities if activities else ["No activities found. Try again!"]}

    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Gemini API Error: {str(e)}")


@app.get("/weather/{city}")
def get_weather(city: str):
    return fetch_weather(city)


@app.get("/")
def home():
    return {"message": "✅ Local Explorer API is running!"}
