// Simulated version of AI Sales Coach 
// This version uses pre-defined responses instead of API calls
// Copy this file over script.js if you're having issues with the backend

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

// Function to simulate AI feedback (no API calls)
async function getAIFeedback(conversation, analysisType, selectedMethodology) {
    // Log information for debugging
    console.log("Analyzing conversation with simulated AI...");
    console.log("Analysis type:", analysisType);
    console.log("Methodology:", selectedMethodology);
    
    // Simulate API processing delay
    return new Promise((resolve) => {
        setTimeout(() => {
            // Select response based on analysis type
            let response;
            
            if (analysisType === 'general') {
                response = `# General Analysis

## Overall Impression
This sales conversation shows several areas for improvement. The salesperson appears eager but lacks some key consultative selling skills.

## Strengths
- Initial attempt to establish rapport with greeting
- Mention of key benefits (productivity increase)
- Reference to social proof (existing clients)

## Areas for Improvement

### 1. Timing and Customer Focus
The conversation appears rushed and product-focused rather than customer-focused. The salesperson doesn't take time to understand the customer's needs before pitching.

**Improved Approach**: "I understand you're looking for ways to improve your team's productivity. Could you tell me a bit about your current challenges so I can focus on what's most relevant to your situation?"

### 2. Value Proposition
The value proposition is generic rather than tailored to specific customer pain points.

**Improved Approach**: "Based on what you've shared about [specific challenge], our solution has helped similar companies reduce time spent on [specific task] by 40%. How would that impact your team's current workflow?"

### 3. Active Listening
There's limited evidence of active listening in the conversation, with the salesperson quickly moving to the next talking point rather than acknowledging and building on customer responses.

**Improved Approach**: "That's an interesting point about [reference something customer said]. Many of our clients have experienced that same issue. How has that affected your team's ability to meet objectives?"

### 4. Next Steps
The conversation lacks a clear, low-pressure next step that aligns with where the customer is in their buying journey.

**Improved Approach**: "Based on our discussion, would it be helpful if I sent you a case study about how [similar company] addressed their [specific challenge]? Then we could schedule a follow-up call if you find it relevant."`;
            } else if (analysisType === 'objections') {
                response = `# Objection Handling Analysis

## Identified Objections
1. **Timing objection**: "I'm actually busy right now"
2. **Satisfaction objection**: "We're happy with our current solution"
3. **Price sensitivity**: (Implied by negative reaction to pricing/discount offer)

## Objection Handling Assessment
The salesperson's approach to handling objections was ineffective and potentially damaged rapport with the prospect. There was minimal attempt to understand objections before trying to overcome them.

## Recommendations for Better Objection Handling

### 1. Time Objection
**Current approach**: Acknowledged but immediately dismissed with "I won't take much of your time" and proceeded anyway.

**Improved approach**: 
"I completely understand you're busy. Would it make sense to schedule a brief 15-minute call at a time that works better for you? That way I can learn a bit about your current situation and see if what we're doing might be relevant."

### 2. Current Solution Objection
**Current approach**: Immediately contradicted with "But our solution is much better!"

**Improved approach**:
"That's great to hear that your current solution is working for you. I'm curious - what aspects of it do you find most valuable? [Listen] Those are important capabilities. Some of our clients found they were missing [specific capability] with their previous solution. Is that something that would be valuable to your team?"

### 3. Price Objection
**Current approach**: Offered immediate discount without establishing value.

**Improved approach**:
"I understand budget considerations are important. Before we discuss pricing, I'd like to understand what specific challenges you're trying to solve. This helps me determine if our solution would provide enough value to justify the investment. Could you share what specific outcomes you're looking to achieve?"

## Key Objection Handling Principles

1. **Acknowledge and validate** the objection first
2. **Ask questions** to understand the real concern
3. **Reframe** objections as opportunities to provide more information
4. **Provide relevant evidence** that addresses the specific concern
5. **Check** if your response addressed their concern before moving on`;
            } else if (analysisType === 'closing') {
                response = `# Closing Techniques Analysis

## Current Closing Approach
The closing approach in this conversation relies on pressure tactics rather than earned progression based on established value and alignment.

## Key Issues with Current Closing

### 1. Premature Closing
Attempting to close before establishing sufficient value and addressing the customer's specific needs.

**Improved Approach**: "Based on what you've shared about your challenges with [specific issue], would it make sense to explore how our solution addresses those specific points?"

### 2. Discount-Based Closing
Using price reduction as the primary closing tool, which devalues your solution.

**Improved Approach**: "Our clients typically see a return on investment within 3-4 months based on the productivity gains. Given your team size and the challenges you've mentioned, this could translate to approximately [specific value] for your organization."

### 3. Single-Option Close
Presenting only one path forward rather than offering choices.

**Improved Approach**: "Based on our conversation, I see two potential ways forward: 1) A focused demo of the specific features that address your immediate needs, or 2) A broader overview session with your team to identify all potential use cases. Which would be more valuable for you at this stage?"

## Effective Closing Techniques to Consider

### 1. Summary Close
Summarize the key points of agreement and the customer's expressed needs before suggesting next steps.

**Example**: "So to recap, you mentioned that your team is spending too much time on manual reporting, your current solution lacks real-time updates, and you're looking for better collaboration features. Would it make sense to see specifically how our solution addresses those three areas?"

### 2. Question-Based Close
Use questions to guide the customer to the logical next step.

**Example**: "Given what you've shared about your timeline for implementation, would it be helpful to schedule a technical review with your IT team in the next week?"

### 3. Alternative Choice Close
Offer choices for moving forward rather than yes/no decisions.

**Example**: "Would you prefer to start with a small pilot in one department, or would you like to see how a company-wide implementation would work?"`;
            } else if (analysisType === 'rapport') {
                response = `# Rapport Building Analysis

## Overall Rapport Assessment
The conversation shows minimal rapport building, with the focus primarily on the product rather than establishing a relationship with the customer.

## Current Rapport Techniques
- Basic greeting and introduction
- Some attempt at pleasantries

## Areas for Improvement

### 1. Personalization
The conversation lacks personalization and feels scripted rather than tailored to this specific customer.

**Improved Approach**: "I noticed from your LinkedIn profile that you've been with [Company] for about [time period]. How have you seen the industry change during that time?"

### 2. Active Listening
There's limited evidence of active listening, with the salesperson moving quickly to the next point rather than acknowledging and building on customer responses.

**Improved Approach**: "That's really interesting what you mentioned about [reference something specific they said]. How has that affected your team's approach to [relevant area]?"

### 3. Finding Common Ground
The conversation doesn't establish any common ground or shared interests/experiences.

**Improved Approach**: "I see you're based in [location]. I actually worked with several companies in that area, including [company name]. The challenges they faced were [relevant challenge]. Is that something you're experiencing as well?"

### 4. Empathy
Limited demonstration of empathy for the customer's situation or challenges.

**Improved Approach**: "Managing a team while dealing with [industry challenge] must be challenging. Many of the leaders I work with mention that it's particularly difficult to [specific challenge]. Has that been your experience?"

## Rapport Building Questions to Consider

1. **Professional Background**: "Could you tell me a bit about your journey to your current role?"

2. **Current Challenges**: "What's the biggest challenge your team is facing right now?"

3. **Success Definition**: "What would success look like for you if we were to work together?"

4. **Personal Connection**: "I noticed [something from their LinkedIn or company website]. That's interesting because [relevant connection]."

5. **Future Vision**: "Where do you see your department/company heading in the next 1-2 years?"`;
            } else {
                response = `# Sales Pitch Evaluation

## Current Pitch Structure
The sales pitch is primarily feature-focused rather than benefit-focused, and doesn't effectively connect to the customer's specific needs or pain points.

## Strengths
- Mentions some benefits (productivity improvement)
- Attempts to provide social proof (mentioning other clients)
- Clear product knowledge

## Areas for Improvement

### 1. Customer-Centric Approach
The pitch begins with product features rather than seeking to understand the customer's situation.

**Improved Approach**: "Before I tell you about our solution, I'd like to understand your current situation. What challenges is your team facing with [relevant process]?"

### 2. Value Proposition Clarity
The value proposition is generic and not tied to specific customer outcomes.

**Improved Approach**: "Our solution typically helps companies in your industry in three specific ways: reducing report generation time from days to minutes, improving data accuracy by 45%, and enabling real-time collaboration across departments. Which of these would be most impactful for your team?"

### 3. Storytelling Elements
The pitch lacks narrative elements that make it memorable and relatable.

**Improved Approach**: "One of our clients, a company similar to yours, was spending 15 hours per week on manual reporting. After implementing our solution, they reduced that to just 2 hours, allowing their team to focus on strategic initiatives that increased their department's productivity by 37%."

### 4. Differentiation
Limited explanation of what makes your solution unique compared to alternatives.

**Improved Approach**: "What makes our approach different is our [unique feature/approach], which unlike other solutions allows you to [specific benefit]. This has been particularly valuable for companies that need to [specific use case]."

## Effective Pitch Structure to Consider

1. **Engage with a relevant question** about their situation
2. **Acknowledge their challenges** based on their response
3. **Present a tailored value proposition** aligned with their specific needs
4. **Provide specific evidence** (case studies, testimonials, data)
5. **Differentiate** from alternative approaches
6. **Suggest a relevant next step** based on their level of interest`;
            }
            
            // If a methodology was selected, add methodology-specific content
            if (selectedMethodology !== 'none') {
                const methodInfo = METHODOLOGIES[selectedMethodology];
                
                response += `\n\n## ${methodInfo.name} Methodology Application

The ${methodInfo.name} approach (${methodInfo.description}) would suggest the following improvements:

`;

                if (selectedMethodology === 'SPIN') {
                    response += `### Situation Questions
- "Could you tell me about your current process for [relevant task]?"
- "How is your team currently structured to handle [relevant area]?"
- "What tools are you currently using for [relevant function]?"

### Problem Questions
- "What challenges have you encountered with your current approach?"
- "Where do bottlenecks typically occur in this process?"
- "What aspects of [relevant area] take up the most time for your team?"

### Implication Questions
- "How has this affected your team's ability to meet targets?"
- "What impact does this issue have on customer satisfaction/retention?"
- "What opportunities have been missed because of these challenges?"

### Need-Payoff Questions
- "If you could reduce the time spent on [task] by 50%, how would that benefit your team?"
- "How valuable would it be to have real-time insights into [relevant area]?"
- "If your team could focus more on [strategic activity] instead of [manual task], what would that mean for your business goals?"`;
                } else if (selectedMethodology === 'BANT') {
                    response += `### Budget Questions
- "Have you allocated budget for addressing these challenges?"
- "What kind of ROI would you need to see to justify an investment in this area?"
- "How does your organization typically approach budgeting for technology investments?"

### Authority Questions
- "Besides yourself, who else would be involved in evaluating a solution like this?"
- "Who would need to approve the final decision?"
- "How does the decision-making process typically work for technology investments in your organization?"

### Need Questions
- "On a scale of 1-10, how critical is solving this challenge for your team right now?"
- "What happens if this issue isn't addressed in the next 6-12 months?"
- "What specific metrics would improve if you had a better solution for this?"

### Timeline Questions
- "What is your timeframe for implementing a solution?"
- "Are there any specific events or milestones driving your timeline?"
- "How quickly would you need to see results after implementation?"`;
                } else if (selectedMethodology === 'CHALLENGER') {
                    response += `### Teaching Insights
- Provide unique perspective: "What we've found working with similar companies is that the real issue isn't [common assumption], but rather [unexpected insight]."
- Challenge assumptions: "Many teams focus on [common approach], but our research shows that [alternative approach] is actually 3x more effective."
- Share relevant data: "85% of companies in your industry are experiencing [relevant trend]. The 15% who aren't share a common approach to [relevant area]."

### Tailoring the Message
- Connect to their business context: "For companies with your specific market position, the highest leverage point is typically [specific area]."
- Acknowledge unique challenges: "Given your team structure and current priorities, the most relevant aspect of this would be [specific feature/benefit]."
- Speak to their role: "As a [their role], you're likely focused on [specific objective]. Here's how this specifically supports that goal..."

### Taking Control
- Guide the conversation: "Based on what you've shared, the next logical step would be to explore [specific aspect]."
- Constructive tension: "Many leaders in your position initially think [common approach] is sufficient, but let me show you why that might be leaving value on the table."
- Confident recommendation: "Given what you've shared about your situation, I'd strongly recommend starting with [specific approach] rather than [alternative]."`;
                } else if (selectedMethodology === 'SOLUTION') {
                    response += `### Pain Identification
- Diagnose before prescribing: "Let's dig into the specific impacts these challenges are having on your team's performance."
- Quantify the pain: "How much time/money is currently being lost due to this issue?"
- Future implications: "If this continues, what will be the impact 6-12 months from now?"

### Power Alignment
- Identify decision makers: "Who else is experiencing the impact of this challenge?"
- Understand influence structure: "How do new solutions typically get evaluated and approved in your organization?"
- Build coalition: "Would it be valuable to include [other stakeholder] in our next conversation?"

### Vision Creation
- Collaborative solution: "Based on what you've shared, here's how I envision a solution working in your specific environment..."
- Before and after: "Currently your process looks like [current state]. With our approach, it would transform to [future state]."
- Success metrics: "How would you measure success? What specific metrics should improve?"

### Value Establishment
- ROI calculation: "Given the time currently spent on [task] and your team's average compensation, we estimate a potential savings of [amount] within the first year."
- Strategic value: "Beyond the direct cost savings, this would also enable your team to focus more on [strategic initiative]."
- Risk reduction: "This approach also reduces the risk of [negative outcome] which typically costs companies like yours [amount] annually."`;
                }
            }
            
            resolve(response);
        }, 2000);
    });
} 