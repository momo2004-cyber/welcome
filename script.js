const questions = [
  { q: "Comment je m'appelle ?", options: ["Mohamed Salah", "François Bayrou", "Jean Dupont"], correct: 0 },
  { q: "Quel âge ai-je ?", options: ["21 ans", "19 ans", "25 ans"], correct: 0 },
  { q: "Quelle est ma date de naissance ?", options: ["4 février 2004", "12 mars 2005", "1 janvier 2003"], correct: 0 },
  { q: "Quel est mon signe astrologique ?", options: ["Verseau", "Bélier", "Taureau"], correct: 0 },
  { q: "Quelle est ma taille ?", options: ["1m72", "1m60", "1m85"], correct: 0 },
  { q: "Quelle est ma nationalité ?", options: ["Franco-algérien", "Marocain", "Français"], correct: 0 },
  { q: "Lequel de ces hobbies me décrit ?", options: ["Lecture, programmation, musculation", "Football, cuisine, voyage", "Cinéma, peinture, danse"], correct: 0 },
  { q: "Quel est mon statut relationnel ?", options: ["Célibataire", "En couple", "Marié"], correct: 0 },
];

let current = 0;
let answers = Array(questions.length).fill(null);

const welcomeEl = document.getElementById("welcome");
const quizEl = document.getElementById("quiz");
const summaryEl = document.getElementById("summary");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const nextBtn = document.getElementById("nextBtn");
const finalScoreEl = document.getElementById("final-score");
const summaryListEl = document.getElementById("summary-list");

function startQuiz() {
  welcomeEl.classList.remove("active");
  quizEl.classList.add("active");
  showQuestion();
}

function showQuestion() {
  const q = questions[current];
  questionEl.textContent = q.q;
  optionsEl.innerHTML = "";
  nextBtn.disabled = true;

  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(idx);
    optionsEl.appendChild(btn);
  });
  scoreEl.textContent = `Question ${current + 1}/${questions.length}`;
}

function selectAnswer(idx) {
  if (answers[current] !== null) return;
  answers[current] = idx;
  const q = questions[current];
  const buttons = optionsEl.querySelectorAll("button");
  buttons.forEach((btn, i) => {
    if (i === q.correct) btn.classList.add("correct");
    else if (i === idx) btn.classList.add("wrong");
    btn.disabled = true;
  });
  nextBtn.disabled = false;
}

function nextQuestion() {
  if (current < questions.length - 1) {
    current++;
    showQuestion();
  } else {
    showSummary();
  }
}

function prevQuestion() {
  if (current > 0) {
    current--;
    showQuestion();
  } else {
    welcomeEl.classList.add("active");
    quizEl.classList.remove("active");
  }
}

function showSummary() {
  quizEl.classList.remove("active");
  summaryEl.classList.add("active");
  const score = answers.reduce((s, a, i) => (a === questions[i].correct ? s + 1 : s), 0);
  finalScoreEl.textContent = `Tu as obtenu ${score}/${questions.length}`;

  summaryListEl.innerHTML = "";
  questions.forEach((q, i) => {
    const div = document.createElement("div");
    const correct = q.options[q.correct];
    const chosen = answers[i] !== null ? q.options[answers[i]] : "—";
    div.innerHTML = `<strong>${q.q}</strong><br> Ta réponse: <span style="color:${answers[i]===q.correct?'green':'red'}">${chosen}</span> — Bonne réponse: <span style="color:green">${correct}</span>`;
    summaryListEl.appendChild(div);
  });
}

function restartQuiz() {
  answers = Array(questions.length).fill(null);
  current = 0;
  summaryEl.classList.remove("active");
  welcomeEl.classList.add("active");
}
