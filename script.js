// script.js (remplacer entièrement le fichier par ce code)

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
let answers = new Array(questions.length).fill(null);

// éléments DOM (doivent exister dans index.html)
const welcomeEl = document.getElementById("welcome");
const quizEl = document.getElementById("quiz");
const summaryEl = document.getElementById("summary");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const scoreEl = document.getElementById("score");
const finalScoreEl = document.getElementById("final-score");
const summaryListEl = document.getElementById("summary-list");

// Démarrer le quiz (appelé par le bouton <button onclick="startQuiz()">)
function startQuiz() {
  if (welcomeEl) welcomeEl.classList.remove("active");
  if (quizEl) quizEl.classList.add("active");
  current = 0;
  showQuestion();
}

// Affiche la question courante
function showQuestion() {
  const q = questions[current];
  questionEl.textContent = q.q;
  optionsEl.innerHTML = "";

  // créer les boutons d'options (toujours activés, pour permettre modification)
  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-btn";
    btn.textContent = opt;
    btn.addEventListener("click", () => selectAnswer(idx));
    btn.disabled = false; // important : boutons activés à l'affichage
    optionsEl.appendChild(btn);
  });

  // si l'utilisateur avait déjà répondu, afficher son choix et la bonne réponse
  if (answers[current] !== null) {
    const buttons = optionsEl.querySelectorAll("button");
    buttons.forEach((btn, i) => {
      btn.classList.remove("correct", "wrong", "selected");
      if (i === answers[current]) btn.classList.add("selected");
      if (i === q.correct) btn.classList.add("correct");
      if (i === answers[current] && answers[current] !== q.correct) btn.classList.add("wrong");
      btn.disabled = false; // on laisse actif pour permettre de changer la réponse
    });
  }

  // Précédent activé seulement si on n'est pas sur la première question
  // (le bouton <button onclick="prevQuestion()"> gère son propre état visuel dans le HTML)
  // Next : activé si la question a été répondue, sinon désactivé pour forcer réponse
  nextBtn.disabled = answers[current] === null;

  scoreEl.textContent = `Question ${current + 1}/${questions.length}`;
}

// Quand l'utilisateur choisit une réponse
function selectAnswer(idx) {
  answers[current] = idx;
  const q = questions[current];
  const buttons = optionsEl.querySelectorAll("button");

  // mise à jour visuelle : enlever anciennes classes puis appliquer
  buttons.forEach((btn, i) => {
    btn.classList.remove("correct", "wrong", "selected");
    if (i === idx) btn.classList.add(i === q.correct ? "correct" : "wrong");
    if (i === q.correct) btn.classList.add("correct");
    btn.disabled = false; // on garde activés pour permettre changement
  });

  // permettre d'aller à la suite
  nextBtn.disabled = false;
}

// Bouton Suivant (appelé depuis index.html via onclick="nextQuestion()")
function nextQuestion() {
  if (current < questions.length - 1) {
    current++;
    showQuestion();
  } else {
    showSummary();
  }
}

// Bouton Précédent (appelé depuis index.html via onclick="prevQuestion()")
function prevQuestion() {
  if (current > 0) {
    current--;
    showQuestion();
  } else {
    // si on est à la première question on retourne à l'accueil
    quizEl.classList.remove("active");
    welcomeEl.classList.add("active");
  }
}

// Affiche le récapitulatif / score
function showSummary() {
  quizEl.classList.remove("active");
  summaryEl.classList.add("active");

  const score = answers.reduce((s, a, i) => (a === questions[i].correct ? s + 1 : s), 0);
  finalScoreEl.textContent = `Tu as obtenu ${score}/${questions.length}`;

  summaryListEl.innerHTML = "";
  questions.forEach((q, i) => {
    const div = document.createElement("div");
    const chosen = answers[i] === null ? "—" : q.options[answers[i]];
    div.innerHTML = `<strong>${q.q}</strong><br> Ta réponse: <span style="color:${answers[i]===q.correct?'green':'red'}">${chosen}</span> — Bonne réponse: <span style="color:green">${q.options[q.correct]}</span>`;
    summaryListEl.appendChild(div);
  });
}

// Bouton Recommencer (appelé depuis index.html via onclick="restartQuiz()")
function restartQuiz() {
  answers = new Array(questions.length).fill(null);
  current = 0;
  summaryEl.classList.remove("active");
  welcomeEl.classList.add("active");
}

