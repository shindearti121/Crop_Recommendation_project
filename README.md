# 🌾 Crop Recommendation System

### 🔍 Overview
The **Crop Recommendation System** uses **Machine Learning** to suggest the most suitable crop to grow based on soil and weather conditions.  
It analyzes parameters like Nitrogen (N), Phosphorous (P), Potassium (K), Temperature, Humidity, pH, and Rainfall — then predicts the best crop using a trained model.

---

## 🚀 Features
- Perform **Exploratory Data Analysis (EDA)** to understand crop data.
- **Data preprocessing** including scaling and encoding.
- Train and evaluate ML models like **Random Forest** and **Decision Tree**.
- **Model tuning & evaluation** with accuracy reports.
- **Beautiful Flask Web App** with farmer-friendly interface
- **Top 3 Crop Recommendations** with confidence scores
- **Interactive sliders** for easy parameter input
- **Crop information** with farming tips and season details
- **Responsive design** that works on all devices
- **Quick preset buttons** for common farming scenarios
- Optional integration with **IoT sensors** or **Weather APIs**.

---

## 🧠 Tech Stack
- **Language:** Python  
- **Libraries:** pandas, numpy, scikit-learn, seaborn, matplotlib, joblib  
- **Web Framework:** Flask (with beautiful HTML/CSS/JavaScript)
- **Deployment:** Flask Web App (can also use Streamlit)
- **Optional APIs:** OpenWeatherMap for real-time weather data  

---

## 🏗️ Project Structure
```
🌾 Crop_Recommendation_System/
│
├── 📁 data/
│   ├── Crop_recommendation.csv
│
├── 📁 notebooks/
│   ├── 01_EDA.ipynb
│   ├── 02_Data_Preprocessing.ipynb
│   ├── 03_Model_Training.ipynb
│   ├── 04_Evaluation_and_Tuning.ipynb
│   ├── 05_Final_Prediction_and_Deployment.ipynb
│
├── 📁 Models/
│   ├── crop_model.pkl
│   ├── scaler.pkl
│   ├── label_encoder.pkl
│
├── 📁 App/
│   ├── flask_app.py
│   ├── templates/
│   │   └── index.html
│   └── static/
│       ├── style.css
│       └── script.js
│
├── 📁 utils/
│   ├── visualization.py
│   ├── weather_api.py
│   ├── iot_simulator.py
│
├── requirements.txt
├── README.md
├── LICENSE
└── .gitignore
```

---

## ⚙️ Installation

### Step 1️⃣: Clone the repository
```bash
git clone https://github.com/your-username/Crop_Recommendation_System.git
cd Crop_Recommendation_System
```

### Step 2️⃣: Install dependencies
```bash
pip install -r requirements.txt
```

### Step 3️⃣: Run the Flask App
```bash
cd App
python flask_app.py
```

Then open your browser and navigate to: **http://localhost:5000**

**Alternative:** Run Streamlit app (if available)
```bash
cd app
streamlit run app.py
```

---

## 🌱 Usage
1. Launch the Flask app (see Step 3 above).
2. Enter soil and weather parameters using the interactive sliders or number inputs.
3. Use the **ℹ️** icons for guidance on each parameter.
4. Try the **Quick Preset** buttons for common farming scenarios.
5. Click **"Get Crop Recommendations"**.
6. View your **top 3 crop recommendations** with confidence scores, farming tips, and detailed information!  

---

## 📊 Example Prediction
| N | P | K | Temperature | Humidity | pH | Rainfall | Predicted Crop |
|---|---|---|--------------|-----------|----|-----------|----------------|
| 90 | 42 | 43 | 25.5°C | 80% | 6.5 | 200mm | Rice |

---

## ✨ Unique Features of This App
- **Farmer-Friendly Design**: Easy-to-use interface with helpful tooltips and guidance
- **Visual Parameter Input**: Interactive sliders with real-time feedback
- **Top 3 Recommendations**: See multiple crop options with confidence scores
- **Crop Information Database**: Detailed info about each crop including season, duration, and farming tips
- **Quick Presets**: One-click presets for common farming scenarios
- **Beautiful Animations**: Smooth, modern UI that's visually appealing
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Print-Friendly**: Print your recommendations for offline reference

## 🧩 Future Enhancements
- Integration with **real-time weather APIs** 🌦️  
- **IoT sensor data** for automated soil reading.  
- Add **fertilizer recommendations** and crop rotation logic.  
- **Multi-language support** for regional farmers
- **Crop comparison tool** to compare multiple crops side-by-side
- **Historical data tracking** for your fields
- Deploy on **AWS / Heroku / Streamlit Cloud**  

---

## 👩‍💻 Author
**Madhuri Shingade**  
💡 Data Science & Machine Learning Enthusiast  
📧 shindearti121@gmail.com

---

## 🪪 License
This project is open-source under the **MIT License**.
