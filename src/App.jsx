import { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "./App.css";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.mjs";

const roles = ["Frontend", "Backend", "Full Stack", "UI/UX", "Data Analyst"];

const resumeSkills = {
  Frontend: ["html", "css", "javascript", "react", "redux", "tailwind", "bootstrap", "git", "api", "responsive"],
  Backend: ["node", "express", "api", "database", "mongodb", "mysql", "jwt", "authentication", "server", "rest"],
  "Full Stack": ["html", "css", "javascript", "react", "node", "express", "mongodb", "api", "git", "deployment"],
  "UI/UX": ["figma", "wireframe", "prototype", "user research", "design", "usability", "layout", "typography", "accessibility", "responsive"],
  "Data Analyst": ["excel", "sql", "python", "dashboard", "power bi", "tableau", "data cleaning", "visualization", "statistics", "report"],
};

const questions = [
  { role: "Frontend", difficulty: "Easy", question: "What is HTML?", answer: "HTML creates structure of a webpage.", keywords: ["html", "structure", "webpage"] },
  { role: "Frontend", difficulty: "Easy", question: "What is CSS?", answer: "CSS styles web pages.", keywords: ["css", "style", "design"] },
  { role: "Frontend", difficulty: "Easy", question: "What is JavaScript?", answer: "JavaScript adds logic and interactivity.", keywords: ["javascript", "logic", "interactive"] },
  { role: "Frontend", difficulty: "Easy", question: "What is React?", answer: "React is a JavaScript UI library.", keywords: ["react", "javascript", "ui"] },
  { role: "Frontend", difficulty: "Easy", question: "What is component?", answer: "Component is a reusable UI part.", keywords: ["component", "reusable", "ui"] },
  { role: "Frontend", difficulty: "Easy", question: "What is JSX?", answer: "JSX lets us write HTML inside JavaScript.", keywords: ["jsx", "html", "javascript"] },

  { role: "Frontend", difficulty: "Medium", question: "What are props?", answer: "Props pass data between components.", keywords: ["props", "data", "component"] },
  { role: "Frontend", difficulty: "Medium", question: "What is state?", answer: "State stores component data.", keywords: ["state", "data", "component"] },
  { role: "Frontend", difficulty: "Medium", question: "What is useState?", answer: "useState manages state in React.", keywords: ["usestate", "state", "react"] },
  { role: "Frontend", difficulty: "Medium", question: "What is useEffect?", answer: "useEffect handles side effects.", keywords: ["useeffect", "side", "effect"] },
  { role: "Frontend", difficulty: "Medium", question: "What is event handling?", answer: "Event handling responds to user actions.", keywords: ["event", "user", "action"] },
  { role: "Frontend", difficulty: "Medium", question: "What is conditional rendering?", answer: "Conditional rendering shows UI based on condition.", keywords: ["condition", "render", "ui"] },

  { role: "Frontend", difficulty: "Hard", question: "What is Virtual DOM?", answer: "Virtual DOM helps React update UI efficiently.", keywords: ["virtual", "dom", "efficient"] },
  { role: "Frontend", difficulty: "Hard", question: "What is memoization?", answer: "Memoization caches values for performance.", keywords: ["memoization", "cache", "performance"] },
  { role: "Frontend", difficulty: "Hard", question: "What is lazy loading?", answer: "Lazy loading loads resources only when needed.", keywords: ["lazy", "loading", "needed"] },
  { role: "Frontend", difficulty: "Hard", question: "What is Context API?", answer: "Context API shares data globally.", keywords: ["context", "api", "global"] },
  { role: "Frontend", difficulty: "Hard", question: "What is prop drilling?", answer: "Prop drilling passes props through many components.", keywords: ["prop", "drilling", "components"] },
  { role: "Frontend", difficulty: "Hard", question: "What is reconciliation?", answer: "Reconciliation compares Virtual DOM and updates changes.", keywords: ["compare", "virtual", "dom"] },

  { role: "Backend", difficulty: "Easy", question: "What is API?", answer: "API connects different systems.", keywords: ["api", "connect", "system"] },
  { role: "Backend", difficulty: "Easy", question: "What is server?", answer: "Server handles client requests.", keywords: ["server", "request", "client"] },
  { role: "Backend", difficulty: "Easy", question: "What is database?", answer: "Database stores data.", keywords: ["database", "store", "data"] },
  { role: "Backend", difficulty: "Easy", question: "What is Node.js?", answer: "Node.js runs JavaScript on server.", keywords: ["node", "javascript", "server"] },
  { role: "Backend", difficulty: "Easy", question: "What is Express?", answer: "Express is a Node.js framework.", keywords: ["express", "node", "framework"] },
  { role: "Backend", difficulty: "Easy", question: "What is route?", answer: "Route defines an API path.", keywords: ["route", "api", "path"] },

  { role: "Backend", difficulty: "Medium", question: "What is REST?", answer: "REST uses HTTP methods for APIs.", keywords: ["rest", "http", "api"] },
  { role: "Backend", difficulty: "Medium", question: "What is middleware?", answer: "Middleware runs between request and response.", keywords: ["middleware", "request", "response"] },
  { role: "Backend", difficulty: "Medium", question: "What is CRUD?", answer: "CRUD means Create Read Update Delete.", keywords: ["create", "read", "update"] },
  { role: "Backend", difficulty: "Medium", question: "What is authentication?", answer: "Authentication verifies user identity.", keywords: ["authentication", "verify", "user"] },
  { role: "Backend", difficulty: "Medium", question: "What is authorization?", answer: "Authorization checks user permission.", keywords: ["authorization", "permission", "user"] },
  { role: "Backend", difficulty: "Medium", question: "What is status code?", answer: "Status code shows request result.", keywords: ["status", "code", "request"] },

  { role: "Backend", difficulty: "Hard", question: "What is JWT?", answer: "JWT is token based authentication.", keywords: ["jwt", "token", "auth"] },
  { role: "Backend", difficulty: "Hard", question: "What is hashing?", answer: "Hashing converts password into secure form.", keywords: ["hash", "password", "secure"] },
  { role: "Backend", difficulty: "Hard", question: "What is indexing?", answer: "Indexing improves database search speed.", keywords: ["index", "database", "speed"] },
  { role: "Backend", difficulty: "Hard", question: "What is caching?", answer: "Caching stores data temporarily for faster access.", keywords: ["cache", "temporary", "fast"] },
  { role: "Backend", difficulty: "Hard", question: "What is rate limiting?", answer: "Rate limiting controls request frequency.", keywords: ["rate", "limit", "request"] },
  { role: "Backend", difficulty: "Hard", question: "What is MVC?", answer: "MVC means Model View Controller.", keywords: ["model", "view", "controller"] },
];

function App() {
  const [mode, setMode] = useState("");
  const [step, setStep] = useState(1);

  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [questionCount, setQuestionCount] = useState(5);
  const [qList, setQList] = useState([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [scoreBoard, setScoreBoard] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);

  const [voiceRole, setVoiceRole] = useState("Frontend");
  const [voiceDifficulty, setVoiceDifficulty] = useState("Easy");
  const [voiceQuestion, setVoiceQuestion] = useState(null);
  const [voiceAnswer, setVoiceAnswer] = useState("");
  const [voiceResult, setVoiceResult] = useState(null);
  const [isListening, setIsListening] = useState(false);

  const [resumeText, setResumeText] = useState("");
  const [jobRole, setJobRole] = useState("Frontend");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeResult, setResumeResult] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(false);

  const [history, setHistory] = useState([]);

  const averageScore =
    scoreBoard.length > 0
      ? Math.round(scoreBoard.reduce((sum, item) => sum + item.rating, 0) / scoreBoard.length)
      : 0;

  const finalGrade =
    averageScore >= 80
      ? "Excellent"
      : averageScore >= 60
      ? "Good"
      : averageScore >= 40
      ? "Need Practice"
      : "Weak";

  const progress =
    qList.length > 0 ? Math.round(((index + 1) / qList.length) * 100) : 0;

  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem("appHistory")) || []);
  }, []);

  useEffect(() => {
    if (mode !== "interview" || step !== 4) return;

    const finalData = {
      type: "Interview",
      role,
      difficulty,
      score: averageScore,
      grade: finalGrade,
      date: new Date().toLocaleString(),
    };

    const old = JSON.parse(localStorage.getItem("appHistory")) || [];
    const updated = [finalData, ...old].slice(0, 8);

    localStorage.setItem("appHistory", JSON.stringify(updated));
    setHistory(updated);
  }, [mode, step, role, difficulty, averageScore, finalGrade]);

  useEffect(() => {
    if (mode !== "interview" || step !== 3 || result) return;

    if (timeLeft <= 0) {
      checkAnswer(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [mode, step, timeLeft, result]);

  const restart = () => {
    setMode("");
    setStep(1);
    setRole("");
    setDifficulty("");
    setAnswer("");
    setResult(null);
    setScoreBoard([]);
    setResumeResult(null);
    setTimeLeft(60);
    setVoiceAnswer("");
    setVoiceResult(null);
    setVoiceQuestion(null);
    setIsListening(false);
  };

  const startInterview = (level) => {
    const filtered = questions.filter(
      (item) => item.role === role && item.difficulty === level
    );

    const count = Number(questionCount);

    if (count < 1 || count > filtered.length) {
      alert(`Please select 1 to ${filtered.length} questions.`);
      return;
    }

    const selected = [...filtered]
      .sort(() => Math.random() - 0.5)
      .slice(0, count);

    setDifficulty(level);
    setQList(selected);
    setIndex(0);
    setAnswer("");
    setResult(null);
    setScoreBoard([]);
    setTimeLeft(60);
    setStep(3);
  };

  const checkAnswer = (autoSubmit = false) => {
    const current = qList[index];

    if (!current) return;

    if (!autoSubmit && answer.trim().length < 5) {
      alert("Write a little more!");
      return;
    }

    const text = answer.toLowerCase();
    let match = 0;

    current.keywords.forEach((keyword) => {
      if (text.includes(keyword.toLowerCase())) match++;
    });

    const rating = Math.round((match / current.keywords.length) * 100);

    let status = "Weak";
    if (difficulty === "Easy") {
      if (rating >= 70) status = "Excellent";
      else if (rating >= 40) status = "Good";
    } else if (difficulty === "Medium") {
      if (rating >= 60) status = "Excellent";
      else if (rating >= 35) status = "Good";
    } else {
      if (rating >= 50) status = "Excellent";
      else if (rating >= 25) status = "Good";
    }

    const newResult = {
      question: current.question,
      userAnswer: autoSubmit && answer.trim() === "" ? "No answer / Time up" : answer,
      correctAnswer: current.answer,
      rating,
      status,
    };

    setResult(newResult);

    setScoreBoard((prev) => {
      const copy = [...prev];
      copy[index] = newResult;
      return copy;
    });
  };

  const nextQuestion = () => {
    if (!result) {
      alert("Please check your answer first.");
      return;
    }

    if (index + 1 < qList.length) {
      setIndex(index + 1);
      setAnswer("");
      setResult(null);
      setTimeLeft(60);
    } else {
      setStep(4);
    }
  };

  const startVoiceQuestion = () => {
    const filtered = questions.filter(
      (item) => item.role === voiceRole && item.difficulty === voiceDifficulty
    );

    if (filtered.length === 0) {
      alert("No question found for this role.");
      return;
    }

    const randomQuestion = filtered[Math.floor(Math.random() * filtered.length)];
    setVoiceQuestion(randomQuestion);
    setVoiceAnswer("");
    setVoiceResult(null);
  };

  const startVoiceAnswer = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice interview is not supported in this browser. Use Chrome or Edge.");
      return;
    }

    if (!voiceQuestion) {
      alert("Please generate a question first.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setVoiceAnswer(spokenText);
    };

    recognition.onerror = () => {
      alert("Could not recognize voice. Try again.");
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const checkVoiceAnswer = () => {
    if (!voiceQuestion) {
      alert("Please generate a question first.");
      return;
    }

    if (voiceAnswer.trim().length < 5) {
      alert("Please speak or write a little more.");
      return;
    }

    const text = voiceAnswer.toLowerCase();
    let match = 0;

    voiceQuestion.keywords.forEach((keyword) => {
      if (text.includes(keyword.toLowerCase())) match++;
    });

    const rating = Math.round((match / voiceQuestion.keywords.length) * 100);

    let status = "Weak";
    if (voiceDifficulty === "Easy") {
      if (rating >= 70) status = "Excellent";
      else if (rating >= 40) status = "Good";
    } else if (voiceDifficulty === "Medium") {
      if (rating >= 60) status = "Excellent";
      else if (rating >= 35) status = "Good";
    } else {
      if (rating >= 50) status = "Excellent";
      else if (rating >= 25) status = "Good";
    }

    setVoiceResult({
      question: voiceQuestion.question,
      userAnswer: voiceAnswer,
      correctAnswer: voiceQuestion.answer,
      rating,
      status,
    });

    const old = JSON.parse(localStorage.getItem("appHistory")) || [];
    const updated = [
      {
        type: "Voice Interview",
        role: voiceRole,
        difficulty: voiceDifficulty,
        score: rating,
        grade: status,
        date: new Date().toLocaleString(),
      },
      ...old,
    ].slice(0, 8);

    localStorage.setItem("appHistory", JSON.stringify(updated));
    setHistory(updated);
  };

  const handlePDFUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }

    try {
      setPdfLoading(true);

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      let fullText = "";

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const textContent = await page.getTextContent();

        const pageText = textContent.items.map((item) => item.str).join(" ");
        fullText += pageText + "\n";
      }

      if (fullText.trim().length < 10) {
        alert("No readable text found. This PDF may be scanned/image-based.");
        return;
      }

      setResumeText(fullText);
      setResumeResult(null);
      alert("PDF text extracted successfully!");
    } catch (error) {
      console.error(error);
      alert("Could not read PDF. Please paste resume text manually.");
    } finally {
      setPdfLoading(false);
      e.target.value = "";
    }
  };

  const checkResume = () => {
    if (resumeText.trim().length < 50) {
      alert("Please paste more resume text or upload a PDF resume.");
      return;
    }

    const text = resumeText.toLowerCase();
    const roleSkills = resumeSkills[jobRole];

    const foundSkills = roleSkills.filter((skill) => text.includes(skill));
    const missingSkills = roleSkills.filter((skill) => !text.includes(skill));

    const skillScore = Math.round((foundSkills.length / roleSkills.length) * 100);

    let structureScore = 0;
    if (text.includes("project")) structureScore += 15;
    if (text.includes("experience")) structureScore += 15;
    if (text.includes("education")) structureScore += 10;
    if (text.includes("skill")) structureScore += 10;
    if (text.includes("github")) structureScore += 10;
    if (text.includes("linkedin")) structureScore += 10;
    if (text.includes("@")) structureScore += 10;
    if (text.includes("achievement") || text.includes("achieved")) structureScore += 10;
    if (text.includes("internship") || text.includes("work")) structureScore += 10;

    const jdWords = jobDescription
      .toLowerCase()
      .split(/\W+/)
      .filter((word) => word.length > 4);

    const uniqueJdWords = [...new Set(jdWords)].slice(0, 30);
    const matchedJdWords = uniqueJdWords.filter((word) => text.includes(word));

    const jdScore =
      uniqueJdWords.length > 0
        ? Math.round((matchedJdWords.length / uniqueJdWords.length) * 100)
        : 0;

    const atsScore =
      uniqueJdWords.length > 0
        ? Math.round(skillScore * 0.5 + structureScore * 0.25 + jdScore * 0.25)
        : Math.round(skillScore * 0.7 + structureScore * 0.3);

    const suggestions = [];

    if (!text.includes("project")) suggestions.push("Add a strong Project section.");
    if (!text.includes("github")) suggestions.push("Add your GitHub profile link.");
    if (!text.includes("linkedin")) suggestions.push("Add your LinkedIn profile link.");
    if (!text.includes("achievement") && !text.includes("achieved")) {
      suggestions.push("Add measurable achievements with numbers.");
    }
    if (missingSkills.length > 0) {
      suggestions.push(`Add missing skills: ${missingSkills.join(", ")}.`);
    }
    if (uniqueJdWords.length > 0 && jdScore < 50) {
      suggestions.push("Improve job description keyword matching.");
    }

    const grade =
      atsScore >= 80
        ? "Excellent"
        : atsScore >= 60
        ? "Good"
        : atsScore >= 40
        ? "Need Improvement"
        : "Weak";

    const report = {
      atsScore,
      skillScore,
      structureScore,
      jdScore,
      grade,
      foundSkills,
      missingSkills,
      matchedJdWords,
      suggestions,
    };

    setResumeResult(report);

    const old = JSON.parse(localStorage.getItem("appHistory")) || [];
    const updated = [
      {
        type: "Resume",
        role: jobRole,
        score: atsScore,
        grade,
        date: new Date().toLocaleString(),
      },
      ...old,
    ].slice(0, 8);

    localStorage.setItem("appHistory", JSON.stringify(updated));
    setHistory(updated);
  };

  const printResumePDF = () => {
    if (!resumeResult) {
      alert("Please analyze your resume first.");
      return;
    }

    window.print();
  };

  return (
    <div className="app">
      {mode === "" && (
        <div className="card">
          <h1>Career Prep Pro</h1>
          <p className="subtitle">
            Practice interviews, voice interviews, and check your resume with ATS-style scoring.
          </p>

          <button onClick={() => setMode("interview")}>Interview Practice</button>
          <button onClick={() => setMode("resume")}>Resume Checker</button>
          <button onClick={() => setMode("voice")}>🎤 Voice Interview</button>

          {history.length > 0 && (
            <div className="history">
              <h2>Recent History</h2>

              {history.map((item, i) => (
                <div className="historyItem" key={i}>
                  <b>{item.type}</b> — {item.role}
                  {item.difficulty && ` | ${item.difficulty}`}
                  <br />
                  Score: {item.score}% | Grade: {item.grade}
                  <br />
                  <small>{item.date}</small>
                </div>
              ))}

              <button
                className="danger"
                onClick={() => {
                  localStorage.removeItem("appHistory");
                  setHistory([]);
                }}
              >
                Clear History
              </button>
            </div>
          )}
        </div>
      )}

      {mode === "voice" && (
        <div className="card wide">
          <h1>🎤 Voice Interview</h1>
          <p className="subtitle">
            Select role, generate a question, then speak your answer.
          </p>

          <label>Select Role</label>
          <select value={voiceRole} onChange={(e) => setVoiceRole(e.target.value)}>
            {roles.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <label>Select Difficulty</label>
          <select
            value={voiceDifficulty}
            onChange={(e) => setVoiceDifficulty(e.target.value)}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>

          <button onClick={startVoiceQuestion}>Generate Question</button>

          {voiceQuestion && (
            <div className="voiceQuestionBox">
              <h3>Question</h3>
              <h2>{voiceQuestion.question}</h2>
            </div>
          )}

          <textarea
            className="largeText"
            value={voiceAnswer}
            onChange={(e) => setVoiceAnswer(e.target.value)}
            placeholder="Your spoken answer will appear here..."
          />

          <div className="resumeActions">
            <button onClick={startVoiceAnswer} disabled={isListening}>
              {isListening ? "Listening..." : "🎤 Start Speaking"}
            </button>

            <button onClick={checkVoiceAnswer}>Check Voice Answer</button>
          </div>

          {voiceResult && (
            <div className={`box ${voiceResult.status}`}>
              <h3>
                {voiceResult.status} — {voiceResult.rating}%
              </h3>
              <p>
                <b>Your Answer:</b> {voiceResult.userAnswer}
              </p>
              <p>
                <b>Correct Answer:</b> {voiceResult.correctAnswer}
              </p>
            </div>
          )}

          <button className="secondary" onClick={restart}>
            Back Home
          </button>
        </div>
      )}

      {mode === "interview" && step === 1 && (
        <div className="card">
          <h1>Select Role</h1>

          {roles.map((item) => (
            <button
              key={item}
              onClick={() => {
                setRole(item);
                setStep(2);
              }}
            >
              {item}
            </button>
          ))}

          <button className="secondary" onClick={restart}>
            Back Home
          </button>
        </div>
      )}

      {mode === "interview" && step === 2 && (
        <div className="card">
          <h1>Select Difficulty</h1>
          <div className="badge">{role}</div>

          <label>How many questions?</label>
          <input
            type="number"
            min="1"
            max="6"
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
          />

          <button onClick={() => startInterview("Easy")}>Easy</button>
          <button onClick={() => startInterview("Medium")}>Medium</button>
          <button onClick={() => startInterview("Hard")}>Hard</button>

          <button className="secondary" onClick={() => setStep(1)}>
            Back
          </button>
        </div>
      )}

      {mode === "interview" && step === 3 && (
        <div className="card wide">
          <div className="topBar">
            <div>
              <span className="badge">{role}</span>
              <span className={`badge ${difficulty}`}>{difficulty}</span>
            </div>

            <div className={timeLeft <= 10 ? "timer dangerText" : "timer"}>
              ⏱ {timeLeft}s
            </div>
          </div>

          <div className="progressOuter">
            <div className="progressInner" style={{ width: `${progress}%` }}></div>
          </div>

          <h3>
            Question {index + 1} of {qList.length}
          </h3>
          <h2>{qList[index].question}</h2>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write your answer..."
            disabled={!!result}
          />

          <button onClick={() => checkAnswer(false)} disabled={!!result}>
            Check Answer
          </button>

          {result && (
            <div className={`box ${result.status}`}>
              <h3>
                {result.status} — {result.rating}%
              </h3>
              <p>
                <b>Your Answer:</b> {result.userAnswer}
              </p>
              <p>
                <b>Correct Answer:</b> {result.correctAnswer}
              </p>
            </div>
          )}

          <button onClick={nextQuestion}>
            {index + 1 === qList.length ? "Finish" : "Next"}
          </button>

          <button className="secondary" onClick={restart}>
            Home
          </button>
        </div>
      )}

      {mode === "interview" && step === 4 && (
        <div className="card wide">
          <h1>Interview Score Board</h1>

          <div className="summaryGrid">
            <div className="summaryBox">
              <h2>{averageScore}%</h2>
              <p>Average Score</p>
            </div>
            <div className="summaryBox">
              <h2>{finalGrade}</h2>
              <p>Final Grade</p>
            </div>
            <div className="summaryBox">
              <h2>{scoreBoard.length}</h2>
              <p>Total Questions</p>
            </div>
          </div>

          {scoreBoard.map((item, i) => (
            <div key={i} className={`box ${item.status}`}>
              <h3>Question {i + 1}</h3>
              <p><b>Q:</b> {item.question}</p>
              <p><b>Your Answer:</b> {item.userAnswer}</p>
              <p><b>Correct Answer:</b> {item.correctAnswer}</p>
              <p><b>Score:</b> {item.rating}%</p>
              <p><b>Status:</b> {item.status}</p>
            </div>
          ))}

          <button onClick={() => window.print()}>Print / Save PDF</button>
          <button className="secondary" onClick={restart}>
            Home
          </button>
        </div>
      )}

      {mode === "resume" && (
        <div className="card wide">
          <h1>Professional Resume Checker</h1>
          <p className="subtitle">
            Paste your resume, upload PDF, and optional job description to get ATS-style analysis.
          </p>

          <label>Select Target Role</label>
          <select value={jobRole} onChange={(e) => setJobRole(e.target.value)}>
            {roles.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <label>Upload Resume PDF</label>
          <input type="file" accept="application/pdf" onChange={handlePDFUpload} />
          {pdfLoading && <p className="subtitle">Reading PDF...</p>}

          <label>Paste Resume Text</label>
          <textarea
            className="largeText"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume text here or upload PDF..."
          />

          <label>Paste Job Description — Optional</label>
          <textarea
            className="largeText"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste job description here for better matching..."
          />

          <div className="resumeActions">
            <button onClick={checkResume}>Analyze Resume</button>

            <button className="successBtn" onClick={printResumePDF}>
              Download / Save PDF
            </button>
          </div>

          {resumeResult && (
            <>
              <div className="summaryGrid">
                <div className="summaryBox">
                  <h2>{resumeResult.atsScore}%</h2>
                  <p>ATS Score</p>
                </div>
                <div className="summaryBox">
                  <h2>{resumeResult.grade}</h2>
                  <p>Resume Grade</p>
                </div>
                <div className="summaryBox">
                  <h2>{resumeResult.skillScore}%</h2>
                  <p>Skill Match</p>
                </div>
              </div>

              <div className="summaryGrid">
                <div className="summaryBox">
                  <h2>{resumeResult.structureScore}%</h2>
                  <p>Structure Score</p>
                </div>
                <div className="summaryBox">
                  <h2>{resumeResult.jdScore}%</h2>
                  <p>JD Match</p>
                </div>
                <div className="summaryBox">
                  <h2>{resumeResult.missingSkills.length}</h2>
                  <p>Missing Skills</p>
                </div>
              </div>

              <div className="box Good">
                <h3>Found Skills</h3>
                <p>{resumeResult.foundSkills.join(", ") || "No strong skill match found."}</p>

                <h3>Missing Skills</h3>
                <p>{resumeResult.missingSkills.join(", ") || "No missing required skill."}</p>

                <h3>Suggestions</h3>
                {resumeResult.suggestions.map((item, i) => (
                  <p key={i}>✅ {item}</p>
                ))}
              </div>

              <div className="resumePreview" id="resume-preview">
                <div className="resumePreviewHeader">
                  <h1>Professional Resume Review</h1>
                  <p>Target Role: {jobRole}</p>
                  <p>
                    ATS Score: {resumeResult.atsScore}% | Grade: {resumeResult.grade}
                  </p>
                </div>

                <div className="resumeSection">
                  <h3>Resume Text</h3>
                  <div className="resumeTextBox">{resumeText}</div>
                </div>

                <div className="resumeSection">
                  <h3>Matched Skills</h3>
                  {resumeResult.foundSkills.length > 0 ? (
                    resumeResult.foundSkills.map((skill, i) => (
                      <span className="skillPill" key={i}>
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p>No strong skill match found.</p>
                  )}
                </div>

                <div className="resumeSection">
                  <h3>Missing Skills</h3>
                  {resumeResult.missingSkills.length > 0 ? (
                    resumeResult.missingSkills.map((skill, i) => (
                      <span className="skillPill missingPill" key={i}>
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p>No missing required skill.</p>
                  )}
                </div>

                <div className="resumeSection">
                  <h3>Suggestions</h3>
                  {resumeResult.suggestions.map((item, i) => (
                    <p key={i}>✅ {item}</p>
                  ))}
                </div>
              </div>
            </>
          )}

          <button className="secondary" onClick={restart}>
            Back Home
          </button>
        </div>
      )}
    </div>
  );
}

export default App;