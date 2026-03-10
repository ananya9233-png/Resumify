# Resumify – AI ATS Resume Analyzer

Resumify is an AI-powered web application that analyzes resumes against job descriptions and evaluates how well they pass an Applicant Tracking System (ATS).

The tool extracts text from a PDF resume, compares it with the provided job description, and uses an AI model to generate a score, keyword matches, strengths, weaknesses, and improvement suggestions.

---

## Features

• Upload a resume in PDF format
• Paste a job description for comparison
• AI-powered ATS score (0–100)
• Section-wise scoring (Education, Projects, Skills, Experience)
• Keyword matching and missing skills detection
• Resume strengths and weaknesses analysis
• Actionable improvement suggestions
• Export the full analysis report as a PDF

---

## Tech Stack

**Frontend**

* HTML5
* CSS3
* Vanilla JavaScript
* PDF.js (for reading PDF content)
* jsPDF (for exporting reports)

**Backend**

* Node.js
* Express.js
* Multer (file uploads)
* pdf-parse (resume text extraction)
* Groq API (Llama 3.1 AI model)
* dotenv

---

## Project Structure

```
Resumify
│
├── public
│   └── index.html        # Frontend UI
│
├── uploads               # Temporary uploaded resumes
│
├── server.js             # Express backend server
├── package.json
├── .env                  # API keys and environment variables
└── README.md
```

---

## Installation

Clone the repository:

```
git clone https://github.com/yourusername/resumify.git
cd resumify
```

Install dependencies:

```
npm install
```

---

## Environment Setup

Create a `.env` file in the root folder.

```
GROQ_API_KEY=your_groq_api_key
PORT=5000
```

You can get an API key from:

https://console.groq.com/keys

---

## Running the Application

Start the server:

```
node server.js
```

Open the application in your browser:

```
http://localhost:5000
```

---

## How It Works

1. The user uploads a resume in PDF format.
2. The backend extracts text using **pdf-parse**.
3. The job description and resume text are sent to the **Groq Llama 3.1 model**.
4. The AI analyzes ATS compatibility and returns structured JSON.
5. The frontend visualizes the results including score, keyword matches, and suggestions.

---

## Example Output

```
ATS Score: 78 / 100
Grade: Good

Strengths
- Strong technical skill section
- Relevant project experience

Weaknesses
- Missing quantified achievements
- Limited leadership experience

Missing Skills
- Docker
- AWS
- Microservices
```

---

## Future Improvements

* Resume keyword highlighting
* Job role specific analysis
* Multiple resume comparisons
* Cloud deployment
* User authentication
* Resume rewriting suggestions

---

## Security Notes

The following files should **not be committed to GitHub**:

```
node_modules
.env
uploads
```

Add them to your `.gitignore`.

---

## License

This project is for educational and demonstration purposes.

---

## Author

Developed as a learning project to explore:

* AI integration in web apps
* Resume analysis systems
* ATS optimization tools

