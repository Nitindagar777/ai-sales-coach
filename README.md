# AI Sales Coach

An intelligent tool that uses Google's Gemini AI to analyze sales conversations and provide actionable feedback to improve selling techniques.

## Features

- **Conversation Analysis**: Upload sales conversations to receive AI-powered feedback
- **Multiple Analysis Types**: 
  - General Analysis
  - Objection Handling
  - Closing Techniques
  - Rapport Building
  - Sales Pitch Evaluation
- **Sales Methodology Integration**:
  - SPIN Selling
  - BANT Qualification Framework
  - Challenger Sale Approach
  - Solution Selling
- **Example Conversations**: Pre-loaded examples to demonstrate functionality
- **Feedback Download**: Save analysis results for later reference
- **Simulation Mode**: Test the application without needing API access

## Getting Started

### Prerequisites

- Python 3.7 or higher
- Flask and other Python dependencies
- Google Gemini API key
- Modern web browser

### Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/ai-sales-coach.git
   cd ai-sales-coach
   ```

2. Install Python dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Set up your API key:
   - Create a `.env` file in the project root
   - Add your Google Gemini API key: `GOOGLE_API_KEY=your_api_key_here`

### Running the Application

1. Start the backend server:
   ```
   python backend.py
   ```
   The server should start at http://localhost:5000

2. Open `index.html` in your web browser

### Using Simulation Mode

If you don't have a Google Gemini API key, you can still test the application:

1. Open `index.html` in your browser
2. Edit the HTML file to use `script_simulated.js` instead of `script.js`

## How It Works

1. User enters or loads a sales conversation
2. Selects analysis type and optional sales methodology
3. The conversation is sent to the backend server
4. Google Gemini AI analyzes the conversation
5. Results are formatted and displayed to the user

## Technologies Used

- **Frontend**: HTML, CSS (Tailwind CSS), JavaScript
- **Backend**: Python, Flask
- **AI**: Google Gemini API
- **DevOps**: CORS for cross-origin requests

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google for the Gemini AI API
- Sales methodology frameworks (SPIN, BANT, etc.)
- Flask team for the Python web framework 