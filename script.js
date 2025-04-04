// Main JavaScript file for AI Sales Coach

// API key for Google Gemini
const API_KEY = "AIzaSyD1QAXifA2SiygSGD1SpzAblsNdIUFwbqk";

// Sales methodology descriptions
const METHODOLOGIES = {
    "SPIN": {
        name: "SPIN Selling",
        description: "A questioning methodology that helps salespeople uncover customer needs.",
        components: {
            "Situation": "Questions that establish the buyer's current context",
            "Problem": "Questions that identify pain points and challenges",
            "Implication": "Questions that explore the consequences of the problems",
            "Need-Payoff": "Questions that get the buyer to articulate the benefits of solving their problem"
        }
    },
    "BANT": {
        name: "BANT",
        description: "A qualification framework to assess opportunity quality.",
        components: {
            "Budget": "Does the prospect have budget allocated for this purchase?",
            "Authority": "Is the prospect a decision maker or influencer?",
            "Need": "Does the prospect have a clear need for your solution?",
            "Timeline": "When does the prospect plan to implement a solution?"
        }
    },
    "CHALLENGER": {
        name: "The Challenger Sale",
        description: "A selling approach based on challenging customer thinking and teaching them something new.",
        components: {
            "Teach": "Provide unique insights about how the customer can compete more effectively",
            "Tailor": "Adapt the message to the customer's specific context",
            "Take Control": "Lead the sale by being assertive about the solution direction"
        }
    },
    "SOLUTION": {
        name: "Solution Selling",
        description: "A sales methodology focused on solving customer problems rather than selling products.",
        components: {
            "Pain": "Identify and develop customer pain points",
            "Power": "Find the people with authority and budget",
            "Vision": "Create a shared vision of the solution",
            "Value": "Establish clear ROI and business case",
            "Control": "Maintain control of the sales process"
        }
    }
};

// DOM Elements
const conversationInput = document.getElementById('conversation-input');
const feedbackOutput = document.getElementById('feedback-output');
const loadingIndicator = document.getElementById('loading-indicator');
const analyzeButton = document.getElementById('analyze-btn');
const downloadButton = document.getElementById('download-btn');
const exampleSelect = document.getElementById('example-conversation');
const loadExampleButton = document.getElementById('load-example');
const analysisTypeSelect = document.getElementById('analysis-type');
const methodologySelect = document.getElementById('methodology');
const tipsToggle = document.getElementById('tips-toggle');
const tipsContent = document.getElementById('tips-content');

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Load example button
    loadExampleButton.addEventListener('click', loadExampleConversation);
    
    // Analyze button
    analyzeButton.addEventListener('click', analyzeConversation);
    
    // Download button
    downloadButton.addEventListener('click', downloadFeedback);
    
    // Tips toggle
    tipsToggle.addEventListener('click', toggleTips);
});

// Load example conversation
function loadExampleConversation() {
    const selectedExample = exampleSelect.value;
    if (selectedExample === 'none') {
        conversationInput.value = '';
        return;
    }
    
    conversationInput.value = EXAMPLE_CONVERSATIONS[selectedExample];
}

// Toggle tips section
function toggleTips() {
    const toggleSpan = tipsToggle.querySelector('span');
    if (tipsContent.classList.contains('hidden')) {
        tipsContent.classList.remove('hidden');
        toggleSpan.textContent = '-';
    } else {
        tipsContent.classList.add('hidden');
        toggleSpan.textContent = '+';
    }
}

// Download feedback as text file
function downloadFeedback() {
    const feedbackText = feedbackOutput.textContent;
    if (feedbackText.trim() === 'Analysis will appear here...') {
        alert('No feedback to download. Please analyze a conversation first.');
        return;
    }
    
    const blob = new Blob([feedbackText], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sales_feedback.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Main function to analyze the conversation
async function analyzeConversation() {
    const conversation = conversationInput.value.trim();
    if (!conversation) {
        alert('Please enter a sales conversation to analyze.');
        return;
    }
    
    const analysisType = analysisTypeSelect.value;
    const selectedMethodology = methodologySelect.value;
    
    // Show loading indicator
    feedbackOutput.classList.add('hidden');
    loadingIndicator.classList.remove('hidden');
    
    try {
        const feedback = await getAIFeedback(conversation, analysisType, selectedMethodology);
        
        // Hide loading indicator
        loadingIndicator.classList.add('hidden');
        feedbackOutput.classList.remove('hidden');
        
        // Display feedback
        feedbackOutput.innerHTML = formatFeedback(feedback);
    } catch (error) {
        console.error('Error analyzing conversation:', error);
        
        // Hide loading indicator
        loadingIndicator.classList.add('hidden');
        feedbackOutput.classList.remove('hidden');
        
        feedbackOutput.innerHTML = `<p class="text-red-500">Error: ${error.message}</p>`;
    }
}

// Format the feedback to add HTML styling
function formatFeedback(feedback) {
    // Convert markdown-like formatting to HTML
    let formatted = feedback
        // Replace headers
        .replace(/# (.*)/g, '<h1>$1</h1>')
        .replace(/## (.*)/g, '<h2>$1</h2>')
        .replace(/### (.*)/g, '<h3>$1</h3>')
        // Replace bullet points
        .replace(/\n- (.*)/g, '\n<li>$1</li>')
        // Replace numbered lists
        .replace(/\n\d+\. (.*)/g, '\n<li>$1</li>')
        // Replace bold text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Replace italic text
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Wrap lists in ul/ol tags
    if (formatted.includes('<li>')) {
        formatted = formatted.replace(/<li>(.*?)<\/li>/g, function(match) {
            return match;
        });
        formatted = formatted.replace(/(<li>.*?<\/li>)+/g, function(match) {
            return '<ul>' + match + '</ul>';
        });
    }
    
    // Add paragraph tags to remaining text
    formatted = '<p>' + formatted.replace(/\n\n/g, '</p><p>') + '</p>';
    
    // Clean up any double paragraph tags
    formatted = formatted.replace(/<p><p>/g, '<p>').replace(/<\/p><\/p>/g, '</p>');
    
    return formatted;
}

// Function to make API calls to Google Gemini
async function getAIFeedback(conversation, analysisType, methodology) {
    // Create prompts based on analysis type
    const analysisPrompts = {
        "general": "Analyze this sales conversation and provide general feedback on effectiveness, engagement, and areas of improvement. Include 3-5 specific recommendations.",
        "objections": "Analyze this sales conversation and identify objections raised by the customer. Provide specific strategies on how to better handle these objections. Include examples of improved responses.",
        "closing": "Analyze this sales conversation and provide feedback on the closing techniques used. Suggest improvements for better conversion. Include specific examples of stronger closing approaches.",
        "rapport": "Analyze this sales conversation and evaluate rapport building. Suggest ways to better connect with the customer. Provide examples of questions or statements that would improve relationship building.",
        "pitch": "Analyze this sales conversation and evaluate the sales pitch. Provide feedback on value proposition and messaging. Include specific examples of how to better communicate value."
    };

    // Base system prompt
    let systemPrompt = `
You are an expert AI Sales Coach with deep knowledge of sales methodologies, techniques, and best practices.
You analyze sales conversations and provide specific, actionable feedback to help sales professionals improve.
Focus on being constructive and specific, providing examples of better approaches where possible.
Format your response with clear headers and bullet points for readability.
`;

    // Add methodology information if specified
    if (methodology !== 'none') {
        const methodInfo = METHODOLOGIES[methodology];
        systemPrompt += `\n\nIncorporate principles from the ${methodInfo.name} methodology in your analysis:`;
        systemPrompt += `\n- Description: ${methodInfo.description}`;
        
        if (methodInfo.components) {
            systemPrompt += "\n- Key Components:";
            for (const [component, desc] of Object.entries(methodInfo.components)) {
                systemPrompt += `\n  - ${component}: ${desc}`;
            }
        }
    }

    // Build the complete prompt
    const prompt = systemPrompt + "\n\n" + analysisPrompts[analysisType] + "\n\n" + conversation;
    
    // First, test if the backend server is running
    console.log("Testing backend server connection...");
    
    try {
        // Try to reach the root endpoint first to verify server is running
        const testResponse = await fetch('http://localhost:5000/');
        
        if (!testResponse.ok) {
            console.error("Backend server test failed:", testResponse.status, testResponse.statusText);
            throw new Error(`Backend server test failed with status: ${testResponse.status}`);
        }
        
        const testData = await testResponse.json();
        console.log("Backend server is running:", testData);
        
        // Now make the actual API call
        console.log("Sending analysis request to backend...");
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
        
        if (!response.ok) {
            let errorMessage = `Server returned status: ${response.status}`;
            try {
                const errorData = await response.json();
                errorMessage = errorData.error || errorMessage;
            } catch (e) {
                console.error("Could not parse error response:", e);
            }
            throw new Error(errorMessage);
        }
        
        const data = await response.json();
        if (!data.feedback) {
            throw new Error("No feedback received from backend");
        }
        
        return data.feedback;
    } catch (error) {
        console.error("Error getting AI feedback:", error);
        
        // Provide a more descriptive error message based on the error
        let errorMessage = `# Error Connecting to Backend Server

## Error Details
${error.message}

## Troubleshooting Steps

1. **Make sure the backend server is running**
   - Run \`python backend.py\` in your command prompt
   - Server should be running at http://localhost:5000
   - You should see messages in the terminal confirming it started

2. **If you receive a "Connection refused" error**
   - The server might not be running
   - Try opening http://localhost:5000 in your browser directly to test

3. **If you receive a CORS error**
   - This is a browser security feature
   - Make sure the backend has CORS properly configured

4. **Verify your API key is correct** in the .env file
   - Current API key: ${API_KEY}

5. **As a temporary solution**, you can use the simulated mode by editing script.js

For technical support, check the browser console log (press F12) for detailed error information.`;
        
        return errorMessage;
    }
} 