import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API"))
system_prompt = (
    "Check this terms of service url and provide summary and alerts."
    "Alerts are any edge cases that are not covered by the summary or may cause problems to users."
    "Provide sentences in order of importance and make it consice."
    "Split the summary and alerts into short sentences."
)
model = genai.GenerativeModel("gemini-1.5-flash", system_instruction=system_prompt)
response_schema = {
    "type": "object",
    "properties": {
        "summary": {"type": "array", "items": {"type": "string"}},
        "alerts": {"type": "array", "items": {"type": "string"}},
    },
    "required": ["summary", "alerts"],
}


def generate_text(prompt):
    return model.generate_content(
        prompt,
        generation_config=genai.GenerationConfig(
            response_mime_type="application/json", response_schema=response_schema
        ),
    ).text
