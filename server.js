// ─────────────────────────────────────────────
//  server.js  —  ResumeLens Backend
//  Run: node server.js
//  Requires: npm install express multer pdf-parse cors groq-sdk dotenv
// ─────────────────────────────────────────────

require("dotenv").config();

const express    = require("express");
const multer     = require("multer");
const pdfParse = require("pdf-parse");
const cors       = require("cors");
const fs         = require("fs");
const Groq       = require("groq-sdk");

// ── Groq client ──────────────────────────────
// Add GROQ_API_KEY=your_key to a .env file
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));   // serves index.html from /public folder

// ── File upload (multer) ─────────────────────
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 },   // 5 MB limit
  fileFilter: (_req, file, cb) => {
    file.mimetype === "application/pdf"
      ? cb(null, true)
      : cb(new Error("Only PDF files are allowed"), false);
  },
});

// ── Routes ───────────────────────────────────
app.get("/", (_req, res) =>
  res.sendFile(__dirname + "/public/index.html")
);

app.post("/api/analyze", upload.single("resume"), async (req, res) => {
  const filePath = req.file?.path;

  try {
    // 1. Validate inputs
    if (!req.file)
      return res.status(400).json({ error: "No resume uploaded." });

    const jobDescription = (req.body.jobDescription || "").trim();
    if (!jobDescription)
      return res.status(400).json({ error: "Job description is required." });

    // 2. Parse PDF
    const buffer     = fs.readFileSync(filePath);
    const pdfData    = await pdfParse(buffer);
    const resumeText = pdfData.text.slice(0, 12000);   // trim to keep tokens low

    // 3. Call Groq
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.3,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: "You are an expert ATS resume reviewer. Always respond with valid JSON only.",
        },
        {
          role: "user",
          content: `Analyze this resume against the job description.

Return ONLY a JSON object in this exact format:
{
  "score": <number 0-100>,
  "grade": "<Excellent|Good|Fair|Needs Work>",
  "verdict": "<one honest sentence about overall fit>",
  "section_scores": {
    "education":  <0-10>,
    "projects":   <0-10>,
    "skills":     <0-10>,
    "experience": <0-10>
  },
  "strengths":          ["<3-5 bullet points>"],
  "weaknesses":         ["<3-5 bullet points>"],
  "missing_skills":     ["<5-7 skills in JD but not in resume>"],
  "matched_skills":     ["<5-7 skills found in both>"],
  "important_keywords": ["<8-12 ATS keywords from JD>"],
  "suggestions":        ["<5-7 specific and actionable improvements>"]
}

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}`,
        },
      ],
    });

    // 4. Parse response
    const raw = completion.choices[0].message.content;
    console.log("RAW GROQ RESPONSE:\n", raw); // 👈 add this

    let parsed;
    try {
      const clean = raw.replace(/```json|```/g, "").trim();
      parsed = JSON.parse(clean);
    } catch {
      console.error("JSON parse failed. Raw response:\n", raw);
      return res.status(500).json({ error: "AI returned invalid JSON. Try again." });
    }

    

    res.json(parsed);

  } catch (err) {
    console.error("Error in /api/analyze:", err);
    res.status(500).json({ error: err.message || "Internal server error." });

  } finally {
    // Always delete the uploaded file
    if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
});

// ── Start server ─────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`ResumeLens server running → http://localhost:${PORT}`)
);