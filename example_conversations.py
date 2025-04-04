"""
Example sales conversations for testing the AI Sales Coach.
"""

# Example 1: Cold Call (Needs Improvement)
COLD_CALL_EXAMPLE = """
Salesperson: Hello, is this John? This is Mike from TechSolutions. How are you today?
Customer: Yes, this is John. I'm fine, but I'm in the middle of something.
Salesperson: Great! I won't take much of your time. I'm calling to tell you about our new software that helps businesses increase productivity by 50%. Would you be interested in hearing more?
Customer: Not really. We're happy with our current solution.
Salesperson: But our solution is much better! It's used by major companies like Google and Microsoft. Can I schedule a demo for you this week?
Customer: No thanks. I need to go now.
Salesperson: Wait! What if I offer you a 20% discount? This is a limited-time offer.
Customer: I said I'm not interested. Goodbye.
Salesperson: Alright, I'll call back next week then. Have a good day!
"""

# Example 2: Discovery Call (Good Example)
DISCOVERY_CALL_EXAMPLE = """
Salesperson: Good morning, Sarah. This is Alex from CloudServices. Is this still a good time for our scheduled call?
Customer: Yes, I have about 20 minutes available.
Salesperson: Perfect, I appreciate your time. Before I dive in, I've done some research on your company, but I'd love to hear from you: what are the main challenges you're facing with your current data management system?
Customer: Well, our biggest issue is how long it takes to generate reports. We're also having trouble with data accuracy when multiple team members are inputting information.
Salesperson: Thank you for sharing that. Those are common pain points we hear. Could you tell me a bit more about your reporting process and how much time it typically takes?
Customer: Sure. Right now, it takes about 2-3 days to compile all the data and generate meaningful reports. This delay means we're often making decisions based on outdated information.
Salesperson: I see. And how is this affecting your team's ability to meet business objectives?
Customer: It's causing major delays in our product development cycle. We need to be more agile in responding to market changes.
Salesperson: That makes sense. Based on what you've shared, I think our CloudAnalytics solution could be a good fit. It automates report generation and updates in real-time. Companies similar to yours have reduced reporting time from days to minutes. Would you be interested in seeing a quick demo focused specifically on these features?
Customer: That does sound relevant. Yes, I'd like to see that.
Salesperson: Great! I'll prepare a customized demo for next week. Before we wrap up, are there any other stakeholders who should be included in that session?
Customer: Yes, I'd like to include our IT Director and one of our analysts.
Salesperson: Perfect. I'll send over a calendar invite with all the details. And is there anything specific you'd like me to highlight during the demo?
Customer: I'd really like to see how the real-time collaboration features work.
Salesperson: Noted. I'll make sure to focus on that. Thank you for your time today, Sarah. I'm looking forward to showing you how we can help address these challenges.
"""

# Example 3: Objection Handling
OBJECTION_HANDLING_EXAMPLE = """
Salesperson: Based on what we've discussed, our project management software seems to align well with your needs. What do you think?
Customer: It looks good, but honestly, it's more expensive than what we were planning to spend.
Salesperson: I understand budget concerns are important. May I ask what price range you were expecting?
Customer: We were thinking around $15 per user, and your solution is $25 per user.
Salesperson: Thank you for sharing that. You're right, our base price is higher than $15. Many clients initially have the same concern, but they find that when they factor in all the integrated features like time tracking, automated reporting, and client billing that come standard with our solution, they actually save money. With most $15 solutions, these would be add-ons that end up costing more in total. Would it be helpful to do a quick ROI calculation based on your specific usage scenario?
Customer: That makes sense, but I'm still not sure if we can justify the cost right now.
Salesperson: I appreciate your candor. What if we looked at a phased implementation approach? We could start with a smaller team at a reduced rate for the first three months, which would allow you to measure the impact before fully committing. Would that help with the immediate budget constraints?
Customer: That might work. How many users would be included in that initial phase?
Salesperson: We could start with up to 10 users at $18 per user for the first quarter. This would give you enough scale to properly evaluate the platform while staying closer to your target price point.
Customer: That sounds more manageable. Can you send me a proposal with those terms?
Salesperson: Absolutely! I'll prepare that today and include the phased approach with the adjusted pricing. Would you also like me to include some case studies from companies similar to yours who saw measurable improvements after implementation?
Customer: Yes, that would be helpful for getting buy-in from the rest of the team.
"""

def get_example_conversation(example_type):
    """Return an example conversation based on the type requested."""
    examples = {
        "cold_call": COLD_CALL_EXAMPLE,
        "discovery": DISCOVERY_CALL_EXAMPLE,
        "objection": OBJECTION_HANDLING_EXAMPLE
    }
    return examples.get(example_type, COLD_CALL_EXAMPLE) 