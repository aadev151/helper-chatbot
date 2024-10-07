import os

import google.generativeai as genai
import requests
from dotenv import load_dotenv
from flask import Flask, jsonify, render_template, request


load_dotenv()
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/sendprompt', methods=['POST'])
def api_send_prompt():
    try:
        prompt = request.json.get('prompt')
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        return jsonify({ 'status': 'OK', 'response': response.text })
    
    except Exception:
        return jsonify({'status': 'error'})


@app.route('/api/weather', methods=['POST'])
def api_weather():
    try:
        api_key = os.getenv("WEATHER_API_KEY")
        city = request.json.get('city')
        request_url = f'https://api.weatherapi.com/v1/current.json?key={api_key}&q={city}&aqi=no'
        response = requests.get(request_url)
        return jsonify({'status': 'OK', 'response': response.json()})
    
    except Exception:
        return jsonify({'status': 'error'})


if __name__ == '__main__':
    app.run(debug=True)
