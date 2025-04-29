from fastapi import FastAPI
from ai import generate_text
import json

app = FastAPI()


@app.get("/api/scan")
def scan(query: str):
    response = json.loads(generate_text(query))
    return response
