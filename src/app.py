import pandas as pd
from flask import Flask, render_template, request, jsonify, send_from_directory
import json
import os

app = Flask(__name__, template_folder='templates', static_folder='static')

diseases1 = pd.read_csv(r"data\final_csv_data.csv")
diseases1 = diseases1.to_dict(orient="records")

# Disease data matching React App.tsx
# diseases = [
#     {'name': 'Diabetes Mellitus', 'namaste': 'NAM-DM-001', 'icd11': 'EE90.0'},
#     {'name': 'Hypertension', 'namaste': 'NAM-HTN-002', 'icd11': 'EE91.1'},
#     {'name': 'Vata Vyadhi', 'namaste': 'NAM-VV-101', 'icd11': 'QD85.0'},
#     {'name': 'Asthma', 'namaste': '1234', 'icd11': 'ABCD'}
# ]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/search')
def search_disease():
    query = request.args.get('q', '').lower()
    if not query:
        return jsonify({'error': 'Query parameter required'}), 400
    
    results = []
    for disease in diseases1:
        if (query in disease['name'].lower()) or (query in disease['Ayurveda_Name']):
            results.append(disease)
    
    return jsonify({'results': results})

@app.route('/api/chatbot')
def chatbot_response():
    message = request.args.get('message', '').lower()
    
    # Simple chatbot responses
    if 'diabetes' in message:
        response = "Diabetes Mellitus has NAMASTE code NAM-DM-001 and ICD-11 code EE90.0."
    elif 'vata' in message:
        response = "Vata Vyadhi has NAMASTE code NAM-VV-101 and ICD-11 code QD85.0."
    elif 'hypertension' in message:
        response = "Hypertension has NAMASTE code NAM-HTN-002 and ICD-11 code EE91.1."
    elif 'asthma' in message:
        response = "Asthma has NAMASTE code 1234 and ICD-11 code ABCD."
    elif 'help' in message or 'what' in message:
        response = "I can help you find NAMASTE and ICD-11 codes for diseases. Try asking about specific conditions like diabetes, hypertension, vata vyadhi, or asthma."
    else:
        response = "I understand you're asking about medical codes. Please specify a disease name, and I'll provide the corresponding NAMASTE and ICD-11 codes."
    
    return jsonify({'response': response})

if __name__ == '__main__':
    # Create directories if they don't exist
    os.makedirs('templates', exist_ok=True)
    os.makedirs('static/css', exist_ok=True)
    os.makedirs('static/js', exist_ok=True)
    
    app.run(debug=True, host='0.0.0.0', port=5000)