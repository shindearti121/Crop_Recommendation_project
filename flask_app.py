from flask import Flask, render_template, request, jsonify
import joblib
import pandas as pd
import numpy as np
import os

# Get the directory of this file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(os.path.dirname(BASE_DIR), "Models")

# Load model and preprocessor
model = joblib.load(os.path.join(MODELS_DIR, "crop_model.pkl"))
preprocessor = joblib.load(os.path.join(MODELS_DIR, "scaler.pkl"))
label_encoder = joblib.load(os.path.join(MODELS_DIR, "label_encoder.pkl"))

app = Flask(__name__)

# Crop information database
CROP_INFO = {
    'rice': {
        'name': 'Rice',
        'emoji': '🌾',
        'description': 'Staple food grain, requires high water and humidity',
        'season': 'Monsoon/Kharif',
        'duration': '90-150 days',
        'tips': ['Requires standing water', 'Needs high nitrogen', 'Plant during monsoon']
    },
    'maize': {
        'name': 'Maize',
        'emoji': '🌽',
        'description': 'Versatile cereal crop, good for animal feed and human consumption',
        'season': 'Kharif/Rabi',
        'duration': '80-100 days',
        'tips': ['Moderate water requirement', 'Good for crop rotation', 'Harvest when kernels are hard']
    },
    'chickpea': {
        'name': 'Chickpea',
        'emoji': '🫘',
        'description': 'Protein-rich legume, improves soil fertility',
        'season': 'Rabi',
        'duration': '90-120 days',
        'tips': ['Drought tolerant', 'Fixes nitrogen in soil', 'Good for intercropping']
    },
    'kidneybeans': {
        'name': 'Kidney Beans',
        'emoji': '🫘',
        'description': 'High protein legume, popular in many cuisines',
        'season': 'Kharif/Rabi',
        'duration': '90-120 days',
        'tips': ['Well-drained soil needed', 'Support required for climbing varieties', 'Harvest when pods are dry']
    },
    'pigeonpeas': {
        'name': 'Pigeon Peas',
        'emoji': '🫘',
        'description': 'Drought-resistant legume, important for food security',
        'season': 'Kharif',
        'duration': '120-180 days',
        'tips': ['Very drought tolerant', 'Deep root system', 'Good for dry regions']
    },
    'mothbeans': {
        'name': 'Moth Beans',
        'emoji': '🫘',
        'description': 'Drought-resistant legume, grows well in arid conditions',
        'season': 'Kharif',
        'duration': '60-90 days',
        'tips': ['Excellent for dry areas', 'Low water requirement', 'Fast growing']
    },
    'mungbean': {
        'name': 'Mung Bean',
        'emoji': '🫘',
        'description': 'Quick-growing legume, popular for sprouts',
        'season': 'Kharif/Rabi',
        'duration': '60-90 days',
        'tips': ['Short duration crop', 'Good for multiple cropping', 'Harvest when pods turn black']
    },
    'blackgram': {
        'name': 'Black Gram',
        'emoji': '🫘',
        'description': 'Protein-rich pulse, improves soil health',
        'season': 'Kharif/Rabi',
        'duration': '80-100 days',
        'tips': ['Moderate water needs', 'Good soil conditioner', 'Popular in Indian cuisine']
    },
    'lentil': {
        'name': 'Lentil',
        'emoji': '🫘',
        'description': 'Nutritious pulse, easy to grow and store',
        'season': 'Rabi',
        'duration': '80-110 days',
        'tips': ['Cool season crop', 'Low water requirement', 'Good for crop rotation']
    },
    'pomegranate': {
        'name': 'Pomegranate',
        'emoji': '🍎',
        'description': 'Nutritious fruit tree, drought tolerant once established',
        'season': 'Year-round',
        'duration': '3-4 years to fruit',
        'tips': ['Deep watering needed', 'Prune regularly', 'Harvest when color deepens']
    },
    'banana': {
        'name': 'Banana',
        'emoji': '🍌',
        'description': 'Tropical fruit, high yield and quick returns',
        'season': 'Year-round',
        'duration': '9-12 months',
        'tips': ['Requires high humidity', 'Needs regular watering', 'Rich organic matter preferred']
    },
    'mango': {
        'name': 'Mango',
        'emoji': '🥭',
        'description': 'King of fruits, high commercial value',
        'season': 'Summer',
        'duration': '3-5 years to fruit',
        'tips': ['Deep root system', 'Prune after harvest', 'Protect from strong winds']
    },
    'grapes': {
        'name': 'Grapes',
        'emoji': '🍇',
        'description': 'High-value fruit, requires support structure',
        'season': 'Year-round',
        'duration': '2-3 years to fruit',
        'tips': ['Trellis support needed', 'Prune in winter', 'Well-drained soil essential']
    },
    'watermelon': {
        'name': 'Watermelon',
        'emoji': '🍉',
        'description': 'Summer fruit, high water content',
        'season': 'Summer',
        'duration': '70-90 days',
        'tips': ['High water requirement', 'Warm weather crop', 'Harvest when tendril dries']
    },
    'muskmelon': {
        'name': 'Muskmelon',
        'emoji': '🍈',
        'description': 'Sweet summer fruit, good market demand',
        'season': 'Summer',
        'duration': '70-90 days',
        'tips': ['Warm climate needed', 'Regular watering', 'Harvest when stem slips easily']
    },
    'apple': {
        'name': 'Apple',
        'emoji': '🍎',
        'description': 'Temperate fruit, requires cold winters',
        'season': 'Temperate regions',
        'duration': '3-5 years to fruit',
        'tips': ['Cold winter required', 'Well-drained soil', 'Regular pruning essential']
    },
    'orange': {
        'name': 'Orange',
        'emoji': '🍊',
        'description': 'Citrus fruit, rich in vitamin C',
        'season': 'Winter',
        'duration': '3-4 years to fruit',
        'tips': ['Moderate climate preferred', 'Regular watering', 'Protect from frost']
    },
    'papaya': {
        'name': 'Papaya',
        'emoji': '🥭',
        'description': 'Tropical fruit, fast growing',
        'season': 'Year-round',
        'duration': '6-9 months to fruit',
        'tips': ['Warm climate needed', 'Well-drained soil', 'Harvest when color changes']
    },
    'coconut': {
        'name': 'Coconut',
        'emoji': '🥥',
        'description': 'Multi-purpose tree, coastal regions preferred',
        'season': 'Year-round',
        'duration': '5-7 years to fruit',
        'tips': ['Coastal areas ideal', 'High humidity needed', 'Regular irrigation']
    },
    'cotton': {
        'name': 'Cotton',
        'emoji': '🌿',
        'description': 'Fiber crop, important for textile industry',
        'season': 'Kharif',
        'duration': '150-180 days',
        'tips': ['Warm climate needed', 'Moderate water', 'Harvest when bolls open']
    },
    'jute': {
        'name': 'Jute',
        'emoji': '🌿',
        'description': 'Fiber crop, requires high rainfall',
        'season': 'Kharif',
        'duration': '120-150 days',
        'tips': ['High rainfall needed', 'Flooding tolerant', 'Harvest before flowering']
    },
    'coffee': {
        'name': 'Coffee',
        'emoji': '☕',
        'description': 'High-value crop, requires specific altitude and climate',
        'season': 'Year-round',
        'duration': '3-4 years to fruit',
        'tips': ['Elevated regions preferred', 'Shade required', 'Well-drained soil essential']
    }
}

def get_top_crops(predictions, probabilities, top_n=3):
    """Get top N crop recommendations with probabilities"""
    # Get indices that would sort probabilities in descending order
    sorted_indices = np.argsort(probabilities[0])[::-1]
    top_crops = []
    for i in range(min(top_n, len(sorted_indices))):
        idx = sorted_indices[i]
        crop_name = label_encoder.inverse_transform([idx])[0]
        confidence = probabilities[0][idx] * 100
        top_crops.append({
            'name': crop_name,
            'confidence': round(confidence, 2),
            'info': CROP_INFO.get(crop_name.lower(), {})
        })
    return top_crops

@app.route("/", methods=["GET", "POST"])
def index():
    prediction_result = None
    top_crops = None
    input_data = None

    if request.method == "POST":
        try:
            # Collect form data
            N = float(request.form.get("N", 0))
            P = float(request.form.get("P", 0))
            K = float(request.form.get("K", 0))
            temperature = float(request.form.get("temperature", 0))
            humidity = float(request.form.get("humidity", 0))
            ph = float(request.form.get("ph", 0))
            rainfall = float(request.form.get("rainfall", 0))

            input_data = {
                'N': N, 'P': P, 'K': K,
                'temperature': temperature,
                'humidity': humidity,
                'ph': ph,
                'rainfall': rainfall
            }

            # Create DataFrame
            sample = pd.DataFrame([{
                "N": N,
                "P": P,
                "K": K,
                "temperature": temperature,
                "humidity": humidity,
                "ph": ph,
                "rainfall": rainfall
            }])

            # Transform + Predict
            x_processed = preprocessor.transform(sample)
            prediction = model.predict(x_processed)[0]
            pred_crop = label_encoder.inverse_transform([prediction])[0]
            
            # Get probabilities for all crops
            if hasattr(model, 'predict_proba'):
                probabilities = model.predict_proba(x_processed)
                top_crops = get_top_crops(prediction, probabilities, top_n=3)
            
            prediction_result = {
                'crop': pred_crop,
                'info': CROP_INFO.get(pred_crop.lower(), {})
            }
        except Exception as e:
            prediction_result = {'error': str(e)}

    return render_template("index.html", 
                         result=prediction_result, 
                         top_crops=top_crops,
                         input_data=input_data)

@app.route("/crop_info/<crop_name>")
def crop_info(crop_name):
    """API endpoint to get crop information"""
    info = CROP_INFO.get(crop_name.lower(), {})
    return jsonify(info)

@app.route("/get_ranges")
def get_ranges():
    """Get parameter ranges for guidance"""
    ranges = {
        'N': {'min': 0, 'max': 140, 'optimal': '20-100'},
        'P': {'min': 0, 'max': 145, 'optimal': '10-50'},
        'K': {'min': 0, 'max': 205, 'optimal': '20-100'},
        'temperature': {'min': 8, 'max': 44, 'optimal': '20-30'},
        'humidity': {'min': 14, 'max': 100, 'optimal': '50-90'},
        'ph': {'min': 3.5, 'max': 10, 'optimal': '6.0-7.5'},
        'rainfall': {'min': 20, 'max': 300, 'optimal': '100-250'}
    }
    return jsonify(ranges)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)