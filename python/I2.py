from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import fitz  # PyMuPDF for PDFs
import docx
import os
import shutil
import uvicorn
from typing import Dict, List
from transformers import pipeline
import requests

app = FastAPI()
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
HEADERS = {"Authorization": f"Bearer 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"}

# Load summarization pipeline
# summarizer = pipeline("summarization", model="t5-small")

def extract_text_from_pdf(pdf_path: str) -> str:
    doc = fitz.open(pdf_path)
    text = "\n".join([page.get_text("text") for page in doc])
    return text

def extract_text_from_docx(docx_path: str) -> str:
    doc = docx.Document(docx_path)
    text = "\n".join([para.text for para in doc.paragraphs])
    return text

def extract_sections(text: str) -> Dict[str, str]:
    sections = {}
    lines = text.split("\n")
    current_section = ""
    
    for line in lines:
        if line.strip().endswith(":") or line.strip().isupper():  # Identify section headings
            current_section = line.strip().replace(":", "")
            sections[current_section] = ""
        elif current_section:
            sections[current_section] += line + "\n"
    
    return sections

def summarize_text(text):
    MAX_INPUT_LENGTH = 1024  # Adjust this based on the model you are using

    # Ensure input is within the model's limit
    if len(text) > MAX_INPUT_LENGTH:
        text = text[:MAX_INPUT_LENGTH]  # Truncate text

    response = requests.post(API_URL, headers=HEADERS, json={"inputs": text})
    print(response.status_code)  # Print the status code
    print(response.json())  # Print the entire response to see its structure
    
    if response.status_code == 200:
        json_response = response.json()
        if isinstance(json_response, list) and len(json_response) > 0:
            return json_response[0].get("summary_text", "Summary not found")
        else:
            return "Error: No summary returned from the API."
    else:
        return f"Error: API request failed with status code {response.status_code}"

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    file_ext = file.filename.split(".")[-1]
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    if file_ext == "pdf":
        text = extract_text_from_pdf(file_path)
    elif file_ext in ["docx", "doc"]:
        text = extract_text_from_docx(file_path)
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type")
    
    sections = extract_sections(text)
    return JSONResponse(content={"filename": file.filename, "sections": list(sections.keys())})

@app.get("/get_text/{filename}")
async def get_text(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    
    file_ext = filename.split(".")[-1]
    if file_ext == "pdf":
        text = extract_text_from_pdf(file_path)
    elif file_ext in ["docx", "doc"]:
        text = extract_text_from_docx(file_path)
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type")
    
    return JSONResponse(content={"filename": filename, "text": text})

@app.get("/get_summary/{filename}")
async def get_summary(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    
    file_ext = filename.split(".")[-1]
    if file_ext == "pdf":
        text = extract_text_from_pdf(file_path)
    elif file_ext in ["docx", "doc"]:
        text = extract_text_from_docx(file_path)
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type")
    
    summary = summarize_text(text)
    return JSONResponse(content={"filename": filename, "summary": summary})

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
