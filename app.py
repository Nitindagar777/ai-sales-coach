import streamlit as st
import google.generativeai as genai
import os
from dotenv import load_dotenv
from example_conversations import get_example_conversation
from sales_methodologies import get_methodology_summary, get_methodology

# Load environment variables
load_dotenv()

# Configure Google Gemini API
API_KEY = os.getenv("GOOGLE_API_KEY", "AIzaSyD1QAXifA2SiygSGD1SpzAblsNdIUFwbqk")
genai.configure(api_key=API_KEY)

# Initialize Gemini model
model = genai.GenerativeModel('gemini-pro')

# Set page configuration
st.set_page_config(
    page_title="AI Sales Coach",
    page_icon="💬",
    layout="wide"
)

# App title and description
st.title("AI Sales Coach")
st.markdown("### Analyze your sales conversations and get AI-powered feedback")

# Function to analyze sales conversation
def analyze_sales_conversation(conversation, analysis_type, selected_methodology=None):
    # Base system prompt that includes understanding of sales concepts
    system_prompt = """
    You are an expert AI Sales Coach with deep knowledge of sales methodologies, techniques, and best practices.
    You analyze sales conversations and provide specific, actionable feedback to help sales professionals improve.
    Focus on being constructive and specific, providing examples of better approaches where possible.
    Format your response with clear headers and bullet points for readability.
    """
    
    # Add methodology information if specified
    if selected_methodology:
        methodology_info = get_methodology(selected_methodology)
        if methodology_info:
            system_prompt += f"\n\nIncorporate principles from the {methodology_info['name']} methodology in your analysis:"
            system_prompt += f"\n- Description: {methodology_info['description']}"
            
            if 'components' in methodology_info:
                system_prompt += "\n- Key Components:"
                for component, desc in methodology_info['components'].items():
                    system_prompt += f"\n  - {component}: {desc}"
            
            if 'key_principles' in methodology_info:
                system_prompt += "\n- Key Principles:"
                for principle in methodology_info['key_principles']:
                    system_prompt += f"\n  - {principle}"
    
    # Type-specific prompts
    analysis_prompts = {
        "general": "Analyze this sales conversation and provide general feedback on effectiveness, engagement, and areas of improvement. Include 3-5 specific recommendations.",
        "objections": "Analyze this sales conversation and identify objections raised by the customer. Provide specific strategies on how to better handle these objections. Include examples of improved responses.",
        "closing": "Analyze this sales conversation and provide feedback on the closing techniques used. Suggest improvements for better conversion. Include specific examples of stronger closing approaches.",
        "rapport": "Analyze this sales conversation and evaluate rapport building. Suggest ways to better connect with the customer. Provide examples of questions or statements that would improve relationship building.",
        "pitch": "Analyze this sales conversation and evaluate the sales pitch. Provide feedback on value proposition and messaging. Include specific examples of how to better communicate value."
    }
    
    # Build the complete prompt
    prompt = system_prompt + "\n\n" + analysis_prompts[analysis_type] + "\n\n" + conversation
    
    response = model.generate_content(prompt)
    return response.text

# Sidebar for options
st.sidebar.title("Analysis Options")
analysis_type = st.sidebar.selectbox(
    "Select analysis type",
    options=["general", "objections", "closing", "rapport", "pitch"],
    format_func=lambda x: {
        "general": "General Analysis",
        "objections": "Objection Handling",
        "closing": "Closing Techniques",
        "rapport": "Rapport Building",
        "pitch": "Sales Pitch Evaluation"
    }[x]
)

# Methodology selector in sidebar
st.sidebar.markdown("---")
st.sidebar.subheader("Sales Methodology")
methodology_summaries = get_methodology_summary()
methodology_options = ["none"] + list(methodology_summaries.keys())
selected_methodology = st.sidebar.selectbox(
    "Apply sales methodology framework:",
    options=methodology_options,
    format_func=lambda x: "No Specific Methodology" if x == "none" else f"{x}: {methodology_summaries.get(x, '')}"
)

# Example selector in sidebar
st.sidebar.markdown("---")
st.sidebar.subheader("Example Conversations")
example_type = st.sidebar.radio(
    "Load an example conversation:",
    options=["none", "cold_call", "discovery", "objection"],
    format_func=lambda x: {
        "none": "No Example",
        "cold_call": "Cold Call Example",
        "discovery": "Discovery Call Example",
        "objection": "Objection Handling Example"
    }[x]
)

# Create columns for input and output
col1, col2 = st.columns([1, 1])

# Input section
with col1:
    st.subheader("Enter Sales Conversation")
    
    # Load example if selected
    initial_text = ""
    if example_type != "none":
        initial_text = get_example_conversation(example_type)
    
    conversation = st.text_area(
        "Paste your sales conversation here",
        value=initial_text,
        height=400,
        placeholder="Example:\nSalesperson: Hello, I'm calling from XYZ company. Do you have a moment to talk about our solutions?\nCustomer: I'm actually quite busy right now.\nSalesperson: I understand. When would be a better time to call back?..."
    )
    
    analysis_button = st.button("Analyze Conversation", type="primary")
    
    # Display sales methodology information if selected
    if selected_methodology != "none":
        method_info = get_methodology(selected_methodology)
        if method_info:
            with st.expander(f"About {method_info['name']} Methodology"):
                st.markdown(f"**{method_info['name']}**: {method_info['description']}")
                
                if 'components' in method_info:
                    st.markdown("#### Key Components")
                    for component, desc in method_info['components'].items():
                        st.markdown(f"- **{component}**: {desc}")
                
                if 'key_principles' in method_info:
                    st.markdown("#### Key Principles")
                    for principle in method_info['key_principles']:
                        st.markdown(f"- {principle}")

# Output section
with col2:
    st.subheader("AI Feedback")
    if analysis_button:
        if conversation:
            with st.spinner("Analyzing conversation..."):
                try:
                    method_to_use = None if selected_methodology == "none" else selected_methodology
                    feedback = analyze_sales_conversation(conversation, analysis_type, method_to_use)
                    st.markdown(feedback)
                    
                    # Allow downloading the feedback
                    st.download_button(
                        label="Download Feedback",
                        data=feedback,
                        file_name="sales_feedback.txt",
                        mime="text/plain"
                    )
                except Exception as e:
                    st.error(f"An error occurred: {str(e)}")
        else:
            st.error("Please enter a sales conversation to analyze.")

# Tips and guidance section
with st.expander("Sales Improvement Tips"):
    st.markdown("""
    ### Common Sales Improvement Areas
    
    1. **Active Listening**: Focus on what the customer is saying rather than thinking about your next response.
    
    2. **Value Proposition**: Clearly articulate how your product/service solves the customer's specific problems.
    
    3. **Question Techniques**: Use open-ended questions to uncover needs and pain points.
    
    4. **Objection Handling**: Acknowledge objections, respond with empathy, and provide evidence to address concerns.
    
    5. **Follow-Up**: Create a systematic approach to following up without being pushy.
    """)

# Footer
st.markdown("---")
st.markdown("AI Sales Coach | Powered by Google Gemini") 