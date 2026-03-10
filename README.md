# Resumify – AI ATS Resume Analyzer

Resumify is an AI-powered web application that analyzes resumes against job descriptions and evaluates how well they pass an **Applicant Tracking System (ATS)**.

The tool extracts text from a PDF resume, compares it with a provided job description, and uses an AI model to generate:

* ATS compatibility score
* Keyword matches
* Strengths and weaknesses
* Missing skills
* Actionable improvement suggestions

The goal is to help candidates optimize their resumes for modern ATS-based hiring systems.

---

# Live Demo

Frontend (Netlify):
https://resiai.netlify.app

Backend API (Render):
https://resumify-bxqq.onrender.com

---

# Features

• Upload a resume in **PDF format**
• Paste a **job description** for comparison
• AI-generated **ATS score (0–100)**
• Section-wise scoring (Education, Projects, Skills, Experience)
• **Keyword matching** and **missing skills detection**
• Resume **strengths and weaknesses analysis**
• **Actionable suggestions** to improve the resume
• Export the full analysis report as a **PDF**

---

# Tech Stack

## Frontend

* HTML5
* CSS3
* Vanilla JavaScript
* PDF.js (extracts text from resumes)
* jsPDF (exports analysis report)

Hosted on **Netlify**

---

## Backend

* Node.js
* Express.js
* Multer (file uploads)
* pdf-parse (resume text extraction)
* Groq API (Llama 3.1 AI model)
* dotenv

Hosted on **Render**

---

# Project Architecture

Frontend and backend are deployed separately.

```
User
  ↓
Netlify Frontend
  ↓
Render Backend API
  ↓
Groq AI (Llama 3.1)
```

The frontend sends the resume and job description to the backend API which performs AI analysis and returns structured JSON results.

---

# Project Structure

```
Resumify
│
├── index.html             # Frontend UI
│   
├── uploads               # Temporary uploaded resumes
│
├── server.js             # Express backend server
├── package.json
├── .env                  # API keys and environment variables
└── README.md
```

---

# Installation

Clone the repository

```
git clone https://github.com/yourusername/resumify.git
cd resumify
```

Install dependencies

```
npm install
```

---

# Environment Setup

Create a `.env` file in the root directory.

```
GROQ_API_KEY=your_groq_api_key
PORT=5000
```

Get a Groq API key here:

https://console.groq.com/keys

---

# Running the Backend Locally

Start the server

```
node server.js
```

Server will run at

```
http://localhost:5000
```

---

# API Endpoint

### Analyze Resume

POST

```
/api/analyze
```

Form Data

```
resume: PDF file
jobDescription: string
```

Example Response

```
{
  "score": 82,
  "grade": "Excellent",
  "verdict": "Strong candidate with good technical alignment.",
  "section_scores": {
    "education": 8,
    "projects": 9,
    "skills": 9,
    "experience": 7
  },
  "strengths": [...],
  "weaknesses": [...],
  "missing_skills": [...],
  "matched_skills": [...],
  "important_keywords": [...],
  "suggestions": [...]
}
```

---

# How It Works

1. The user uploads a resume (PDF).
2. The backend extracts text using **pdf-parse**.
3. The resume text and job description are sent to the **Groq Llama 3.1 AI model**.
4. The AI evaluates ATS compatibility and generates structured feedback.
5. The frontend visualizes the results including score, keywords, and suggestions.

---

# Security Notes

The following files should **not be committed to GitHub**:

```
node_modules
.env
uploads
```

Add them to `.gitignore`.

---

# Future Improvements

* Resume keyword highlighting
* Job role specific analysis
* Multiple resume comparisons
* Resume rewriting suggestions
* User authentication
* Resume history dashboard

---

# License

This project is for educational and demonstration purposes.

---

# Author

Developed by **Ananya Sharma**

This project was built to explore:

* AI integration in web applications
* Resume analysis systems
* ATS optimization tools
* Full-stack deployment with Netlify and Render


