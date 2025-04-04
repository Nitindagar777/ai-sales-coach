# AI Sales Coach - HTML Interface

A standalone web interface for the AI Sales Coach application that uses Google's Gemini API to analyze sales conversations and provide improvement suggestions.

## Files in this Project

- `index.html` - Main HTML file with the user interface
- `styles.css` - CSS styles for the interface
- `script.js` - JavaScript frontend logic with AI simulation
- `examples.js` - Example sales conversations
- `backend.py` - Python backend implementation (for reference)

## Running the Application

### Option 1: Static Frontend Only (Demo Mode)

This approach uses simulated AI responses without making actual API calls to Google Gemini.

1. Simply open the `index.html` file in a web browser:
   - Double-click the file
   - Or use a simple HTTP server:
     ```
     # Python 3
     python -m http.server
     
     # Then open http://localhost:8000 in your browser
     ```

2. The interface will load with simulated AI responses (no actual API calls).

### Option 2: Full Implementation with Backend

To use actual Google Gemini API calls:

1. Install Python requirements:
   ```
   pip install flask flask-cors google-generativeai python-dotenv
   ```

2. Run the Flask backend:
   ```
   python backend.py
   ```

3. Update the `script.js` file to use the real API instead of simulations:
   - Find the `getAIFeedback` function
   - Replace the simulation code with actual API calls to the backend
   - Example:
     ```javascript
     async function getAIFeedback(conversation, analysisType, methodology) {
         const response = await fetch('http://localhost:5000/api/analyze', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                 conversation: conversation,
                 analysis_type: analysisType,
                 methodology: methodology
             })
         });
         
         const data = await response.json();
         if (data.error) {
             throw new Error(data.error);
         }
         
         return data.feedback;
     }
     ```

## Using the Interface

1. **Enter a Sales Conversation**:
   - Type or paste a sales conversation in the text area
   - Or use the dropdown to load an example conversation

2. **Select Analysis Type**:
   - General Analysis
   - Objection Handling
   - Closing Techniques
   - Rapport Building
   - Sales Pitch Evaluation

3. **Apply Sales Methodology** (optional):
   - SPIN Selling
   - BANT Framework
   - Challenger Sale
   - Solution Selling

4. **Get Analysis**:
   - Click "Analyze Conversation" to receive AI feedback

5. **Save Results**:
   - Use the "Download Feedback" button to save the analysis as a text file

## Customization

To customize the interface:

- Edit `styles.css` to change the appearance
- Modify `examples.js` to add or change example conversations
- Update methodology descriptions in `script.js`

## Notes

- The static demo version uses simulated responses to demonstrate functionality
- For production use, implement proper API calls to Google Gemini
- Ensure API keys are properly secured and not exposed in frontend code 