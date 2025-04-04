"""
Common sales methodologies and frameworks used in modern sales.
These can be referenced by the AI Sales Coach when providing feedback.
"""

METHODOLOGIES = {
    "SPIN": {
        "name": "SPIN Selling",
        "description": "A questioning methodology that helps salespeople uncover customer needs.",
        "components": {
            "Situation": "Questions that establish the buyer's current context",
            "Problem": "Questions that identify pain points and challenges",
            "Implication": "Questions that explore the consequences of the problems",
            "Need-Payoff": "Questions that get the buyer to articulate the benefits of solving their problem"
        },
        "example_questions": {
            "Situation": [
                "How do you currently handle...?",
                "What systems do you have in place for...?",
                "Who's responsible for...?"
            ],
            "Problem": [
                "What challenges are you facing with...?",
                "Are you satisfied with your current approach to...?",
                "What's preventing you from...?"
            ],
            "Implication": [
                "How does this problem affect your...?",
                "What happens if you don't address this issue?",
                "How does this impact your team/revenue/customers?"
            ],
            "Need-Payoff": [
                "How would it help if you could...?",
                "What would be the value of solving...?",
                "If we could reduce the time it takes to..., how would that benefit you?"
            ]
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
        },
        "example_questions": {
            "Budget": [
                "Do you have a budget allocated for this initiative?",
                "What kind of investment have you made in similar solutions?",
                "How does your organization typically approach budgeting for these types of solutions?"
            ],
            "Authority": [
                "Besides yourself, who else would be involved in this decision?",
                "How does the purchasing process typically work for solutions like this?",
                "Who would need to sign off on this decision?"
            ],
            "Need": [
                "What specific challenges are you looking to address?",
                "How is this issue impacting your business currently?",
                "What solutions have you tried in the past?"
            ],
            "Timeline": [
                "When are you looking to implement a solution?",
                "What's driving your timeline?",
                "Are there any specific events or milestones you're working toward?"
            ]
        }
    },
    
    "CHALLENGER": {
        "name": "The Challenger Sale",
        "description": "A selling approach based on challenging customer thinking and teaching them something new.",
        "components": {
            "Teach": "Provide unique insights about how the customer can compete more effectively",
            "Tailor": "Adapt the message to the customer's specific context",
            "Take Control": "Lead the sale by being assertive about the solution direction"
        },
        "key_principles": [
            "Lead with insights that challenge customer assumptions",
            "Understand the customer's business well enough to offer valuable perspective",
            "Be comfortable with constructive tension in the conversation",
            "Focus on business outcomes rather than product features",
            "Address economic drivers, not just functional needs"
        ]
    },
    
    "SOLUTION": {
        "name": "Solution Selling",
        "description": "A sales methodology focused on solving customer problems rather than selling products.",
        "stages": [
            "Pain: Identify and develop customer pain points",
            "Power: Find the people with authority and budget",
            "Vision: Create a shared vision of the solution",
            "Value: Establish clear ROI and business case",
            "Control: Maintain control of the sales process"
        ],
        "key_principles": [
            "Focus on solving problems, not pitching products",
            "Position yourself as a consultant rather than a salesperson",
            "Diagnose before prescribing solutions",
            "Quantify the impact of the problem and potential solution",
            "Collaborate with the customer to develop the solution"
        ]
    }
}

def get_methodology(methodology_name):
    """Return information about a specific sales methodology."""
    return METHODOLOGIES.get(methodology_name.upper(), None)

def get_all_methodologies():
    """Return a list of all available methodologies."""
    return list(METHODOLOGIES.keys())

def get_methodology_summary():
    """Return a summary of all methodologies."""
    return {name: data["description"] for name, data in METHODOLOGIES.items()} 