"""
Example backend implementation for AI Sales Coach using Google's Gemini API.
This would be used in a real implementation instead of the simulated responses in script.js.
"""

import google.generativeai as genai
import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS

# Load environment variables
load_dotenv()

# Configure Google Gemini API
API_KEY = os.getenv("GOOGLE_API_KEY", "AIzaSyD1QAXifA2SiygSGD1SpzAblsNdIUFwbqk")
genai.configure(api_key=API_KEY)

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Add a simple root endpoint for testing
@app.route('/')
def root():
    return jsonify({"status": "API is running", "endpoints": ["/api/analyze"]})

# Sales methodology information
METHODOLOGIES = {
    "SPIN": {
        "name": "SPIN Selling",
        "description": "A questioning methodology that helps salespeople uncover customer needs.",
        "components": {
            "Situation": "Questions that establish the buyer's current context",
            "Problem": "Questions that identify pain points and challenges",
            "Implication": "Questions that explore the consequences of the problems",
            "Need-Payoff": "Questions that get the buyer to articulate the benefits of solving their problem"
        }
    },
    "BANT": {
        "name": "BANT",
        "description": "A qualification framework to assess opportunity quality.",
        "components": {
            "Budget": "Does the prospect have budget allocated for this purchase?",
            "Authority": "Is the prospect a decision maker or influencer?",
            "Need": "Does the prospect have a clear need for your solution?",
            "Timeline": "When does the prospect plan to implement a solution?"
        }
    },
    "CHALLENGER": {
        "name": "The Challenger Sale",
        "description": "A selling approach based on challenging customer thinking and teaching them something new.",
        "components": {
            "Teach": "Provide unique insights about how the customer can compete more effectively",
            "Tailor": "Adapt the message to the customer's specific context",
            "Take Control": "Lead the sale by being assertive about the solution direction"
        }
    },
    "SOLUTION": {
        "name": "Solution Selling",
        "description": "A sales methodology focused on solving customer problems rather than selling products.",
        "components": {
            "Pain": "Identify and develop customer pain points",
            "Power": "Find the people with authority and budget",
            "Vision": "Create a shared vision of the solution",
            "Value": "Establish clear ROI and business case",
            "Control": "Maintain control of the sales process"
        }
    }
}

# API endpoint for analyzing sales conversations
@app.route('/api/analyze', methods=['POST'])
def analyze_conversation():
    data = request.json
    
    if not data or 'conversation' not in data:
        return jsonify({"error": "No conversation provided"}), 400
    
    conversation = data.get('conversation', '')
    analysis_type = data.get('analysis_type', 'general')
    methodology = data.get('methodology', 'none')
    
    try:
        feedback = get_ai_feedback(conversation, analysis_type, methodology)
        return jsonify({"feedback": feedback})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def get_ai_feedback(conversation, analysis_type, methodology):
    """Get AI feedback on a sales conversation using Google Gemini."""
    
    # Create prompts based on analysis type
    analysis_prompts = {
        "general": "Analyze this sales conversation and provide general feedback on effectiveness, engagement, and areas of improvement. Include 3-5 specific recommendations.",
        "objections": "Analyze this sales conversation and identify objections raised by the customer. Provide specific strategies on how to better handle these objections. Include examples of improved responses.",
        "closing": "Analyze this sales conversation and provide feedback on the closing techniques used. Suggest improvements for better conversion. Include specific examples of stronger closing approaches.",
        "rapport": "Analyze this sales conversation and evaluate rapport building. Suggest ways to better connect with the customer. Provide examples of questions or statements that would improve relationship building.",
        "pitch": "Analyze this sales conversation and evaluate the sales pitch. Provide feedback on value proposition and messaging. Include specific examples of how to better communicate value."
    }

    # Base system prompt
    system_prompt = """
    You are an expert AI Sales Coach with deep knowledge of sales methodologies, techniques, and best practices.
    You analyze sales conversations and provide specific, actionable feedback to help sales professionals improve.
    Focus on being constructive and specific, providing examples of better approaches where possible.
    Format your response with clear headers and bullet points for readability.
    """

    # Add methodology information if specified
    if methodology != 'none' and methodology in METHODOLOGIES:
        method_info = METHODOLOGIES[methodology]
        system_prompt += f"\n\nIncorporate principles from the {method_info['name']} methodology in your analysis:"
        system_prompt += f"\n- Description: {method_info['description']}"
        
        if 'components' in method_info:
            system_prompt += "\n- Key Components:"
            for component, desc in method_info['components'].items():
                system_prompt += f"\n  - {component}: {desc}"

    # Build the complete prompt
    prompt = system_prompt + "\n\n" + analysis_prompts.get(analysis_type, analysis_prompts["general"]) + "\n\n" + conversation
    
    # Initialize Gemini model - UPDATED MODEL NAME
    model = genai.GenerativeModel('gemini-1.5-pro')
    
    # Generate response
    response = model.generate_content(prompt)
    
    return response.text

if __name__ == '__main__':
    print("Starting AI Sales Coach backend server...")
    print("API will be available at: http://localhost:5000")
    print("Press Ctrl+C to stop the server")
    app.run(debug=True, port=5000, host='0.0.0.0') 