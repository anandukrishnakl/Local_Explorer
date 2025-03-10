# 🌍 Local Explorer 🗺️  

## 📌 Project Overview  
Local Explorer is a **location-based activity suggestion web app** that provides **real-time weather updates, local activity recommendations, and an interactive map** to explore places. The application dynamically suggests activities based on the user's **current location, weather conditions, and time of the day** using **Google Gemini AI**.  

Users can:  
- Get real-time **weather information** for their location.  
- Receive **AI-powered activity recommendations** based on weather and time of the day.  
- Use an **interactive map with a search bar** to find activity locations.  
- **Re-suggest activities** to get a different set of recommendations.  

---

## 🚀 Functionalities  
### ✅ **Core Features**  
- **📍 Get Current Location**: Automatically detects the user’s location.  
- **🌤️ Real-time Weather Updates**: Displays temperature, weather conditions.  
- **🤖 AI-Powered Activity Suggestions**: Uses Google Gemini AI to suggest activities based on location, weather, and time of day.  
- **🔄 Resuggest Activities**: Allows users to **refresh** activity recommendations.  
- **🗺️ Interactive Map with Search**

---

## 📋 Requirements  
Before running the project, ensure you have the following installed:  

### **🔹 Backend Requirements**  
- **Python 3.8+**  
- **pip** (Python package manager)  
- **virtualenv** (for virtual environment management)  

### **🔹 Frontend Requirements**  
- **Node.js 16+**  
- **npm** (Node Package Manager)  

---

## 🛠 Installation & Execution  

### **Step 1: Clone the Repository**  
git clone https://github.com/yourusername/local-explorer.git
cd local-explorer

### **Step 2: Backend Setup**
cd backend
python -m venv venv        # Create a virtual environment
source venv/bin/activate   # Activate the virtual environment (Mac/Linux)
venv\Scripts\activate      # Activate the virtual environment (Windows)
pip install -r requirements.txt

touch .env

WEATHER_API_KEY=your_weather_api_key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
GEMINI_API_KEY=your_gemini_api_key
YOUR_TIMEZONE_DB_API_KEY=your_timezone_db_api_key

uvicorn main:app --host 127.0.0.1 --port 7777 --reload (The backend API will now run at http://127.0.0.1:7777/)

### **Step 3: Frontend Setup**

cd frontend
npm install

Execution: npm start (The frontend will start at http://localhost:3000)

## 🏆 Credits
Weather API: WeatherAPI
AI Model: Google Gemini AI
Mapping Services: Google Maps API

## 🎯 Author
Developed by Anandu Krishna KL
