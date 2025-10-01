/**
 * IgnisTech - Estuda+ | Quizzes JavaScript
 * Sistema de quizzes interativos estilo Kahoot
 * Inclui timer, pontuação, feedback visual e animações
 */

// Dados dos quizzes organizados por matéria e dificuldade
const quizzesData = {
  matematica: {
    facil: [
      {
        question: "Quanto é 2 + 2?",
        options: ["3", "4", "5", "6"],
        correct: 1,
        explanation: "2 + 2 = 4. Esta é uma operação básica de adição.",
      },
      {
        question: "Qual é o resultado de 5 × 3?",
        options: ["12", "15", "18", "20"],
        correct: 1,
        explanation: "5 × 3 = 15. Multiplicação é soma repetida: 5 + 5 + 5 = 15.",
      },
      {
        question: "Quantos lados tem um triângulo?",
        options: ["2", "3", "4", "5"],
        correct: 1,
        explanation: "Um triângulo sempre tem 3 lados e 3 ângulos.",
      },
    ],
    medio: [
      {
        question: "Qual é a área de um quadrado com lado 4?",
        options: ["12", "16", "20", "24"],
        correct: 1,
        explanation: "Área do quadrado = lado². Então 4² = 16.",
      },
      {
        question: "Resolva: 3x + 6 = 15",
        options: ["x = 2", "x = 3", "x = 4", "x = 5"],
        correct: 1,
        explanation: "3x = 15 - 6 = 9, então x = 9 ÷ 3 = 3.",
      },
    ],
    dificil: [
      {
        question: "Qual é a derivada de x²?",
        options: ["x", "2x", "x²", "2x²"],
        correct: 1,
        explanation: "A derivada de x² é 2x, usando a regra da potência.",
      },
    ],
  },
  historia: {
    facil: [
      {
        question: "Em que ano o Brasil foi descoberto?",
        options: ["1498", "1500", "1502", "1504"],
        correct: 1,
        explanation: "O Brasil foi descoberto em 1500 por Pedro Álvares Cabral.",
      },
      {
        question: "Quem proclamou a independência do Brasil?",
        options: ["Dom Pedro I", "Dom Pedro II", "Tiradentes", "Getúlio Vargas"],
        correct: 0,
        explanation: "Dom Pedro I proclamou a independência em 7 de setembro de 1822.",
      },
    ],
    medio: [
      {
        question: "Qual foi a primeira capital do Brasil?",
        options: ["Rio de Janeiro", "São Paulo", "Salvador", "Brasília"],
        correct: 2,
        explanation: "Salvador foi a primeira capital do Brasil (1549-1763).",
      },
    ],
    dificil: [
      {
        question: "Em que ano começou a Revolução Industrial?",
        options: ["1750", "1760", "1770", "1780"],
        correct: 1,
        explanation: "A Revolução Industrial começou por volta de 1760 na Inglaterra.",
      },
    ],
  },
  ciencias: {
    facil: [
      {
        question: "Quantos planetas existem no Sistema Solar?",
        options: ["7", "8", "9", "10"],
        correct: 1,
        explanation: "Existem 8 planetas no Sistema Solar desde que Plutão foi reclassificado.",
      },
      {
        question: "Qual é a fórmula da água?",
        options: ["H2O", "CO2", "O2", "H2SO4"],
        correct: 0,
        explanation: "A água tem fórmula H₂O: 2 átomos de hidrogênio e 1 de oxigênio.",
      },
    ],
    medio: [
      {
        question: "Qual é o maior planeta do Sistema Solar?",
        options: ["Terra", "Saturno", "Júpiter", "Netuno"],
        correct: 2,
        explanation: "Júpiter é o maior planeta, com massa maior que todos os outros juntos.",
      },
    ],
    dificil: [
      {
        question: "Qual é a velocidade da luz no vácuo?",
        options: ["300.000 km/s", "299.792.458 m/s", "150.000 km/s", "500.000 km/s"],
        correct: 1,
        explanation: "A velocidade da luz no vácuo é exatamente 299.792.458 m/s.",
      },
    ],
  },
  geografia: {
    facil: [
      {
        question: "Qual é a capital do Brasil?",
        options: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
        correct: 2,
        explanation: "Brasília é a capital federal do Brasil desde 1960.",
      },
    ],
    medio: [
      {
        question: "Qual é o maior rio do mundo?",
        options: ["Nilo", "Amazonas", "Mississippi", "Yangtzé"],
        correct: 1,
        explanation: "O Rio Amazonas é considerado o maior rio do mundo em volume de água.",
      },
    ],
    dificil: [
      {
        question: "Qual país tem mais fusos horários?",
        options: ["Rússia", "Estados Unidos", "China", "França"],
        correct: 3,
        explanation: "A França tem 12 fusos horários devido aos territórios ultramarinos.",
      },
    ],
  },
  portugues: {
    facil: [
      {
        question: "Quantas vogais existem no português?",
        options: ["4", "5", "6", "7"],
        correct: 1,
        explanation: "Existem 5 vogais: A, E, I, O, U.",
      },
    ],
    medio: [
      {
        question: "Qual é o plural de 'cidadão'?",
        options: ["cidadãos", "cidadões", "cidadães", "cidadans"],
        correct: 0,
        explanation: "O plural de cidadão é cidadãos.",
      },
    ],
    dificil: [
      {
        question: "Qual figura de linguagem está em 'O vento sussurrava'?",
        options: ["Metáfora", "Personificação", "Hipérbole", "Ironia"],
        correct: 1,
        explanation: "Personificação atribui características humanas a seres inanimados.",
      },
    ],
  },
}

// Estado do quiz
const currentQuiz = {
  subject: "matematica",
  difficulty: "facil",
  questions: [],
  currentQuestion: 0,
  score: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  timeLeft: 15,
  timerInterval: null,
  isActive: false,
}

/**
 * Inicializa a página de quizzes
 */
document.addEventListener("DOMContentLoaded", () => {
  initializeQuizzes()
})

/**
 * Configura todos os elementos e eventos da página
 */
function initializeQuizzes() {
  setupEventListeners()
  console.log("IgnisTech Quizzes: Página inicializada com sucesso")
}

/**
 * Configura os event listeners
 */
function setupEventListeners() {
  // Teclas de atalho para respostas
  document.addEventListener("keydown", (e) => {
    if (!currentQuiz.isActive) return

    const key = e.key.toLowerCase()
    if (["1", "2", "3", "4"].includes(key)) {
      const index = Number.parseInt(key) - 1
      selectAnswer(index)
    }
  })
}

/**
 * Inicia um novo quiz
 */
function startQuiz() {
  // Obtém configurações selecionadas
  currentQuiz.subject = document.getElementById("subjectSelect").value
  currentQuiz.difficulty = document.getElementById("difficultySelect").value

  // Prepara perguntas
  prepareQuestions()

  // Reseta estado
  currentQuiz.currentQuestion = 0
  currentQuiz.score = 0
  currentQuiz.correctAnswers = 0
  currentQuiz.wrongAnswers = 0
  currentQuiz.isActive = true

  // Muda para tela do quiz
  document.getElementById("startScreen").style.display = "none"
  document.getElementById("quizScreen").style.display = "block"
  document.getElementById("resultsScreen").style.display = "none"

  // Carrega primeira pergunta
  loadQuestion()
}

/**
 * Prepara as perguntas baseadas na dificuldade selecionada
 */
function prepareQuestions() {
  const subjectData = quizzesData[currentQuiz.subject]

  if (currentQuiz.difficulty === "misto") {
    // Mistura perguntas de todas as dificuldades
    currentQuiz.questions = []
    Object.values(subjectData).forEach((difficultyQuestions) => {
      currentQuiz.questions.push(...difficultyQuestions)
    })
  } else {
    // Usa apenas a dificuldade selecionada
    currentQuiz.questions = [...subjectData[currentQuiz.difficulty]]
  }

  // Embaralha as perguntas
  shuffleArray(currentQuiz.questions)

  // Limita a 10 perguntas
  currentQuiz.questions = currentQuiz.questions.slice(0, 10)
}

/**
 * Carrega a pergunta atual
 */
function loadQuestion() {
  const question = currentQuiz.questions[currentQuiz.currentQuestion]
  if (!question) {
    endQuiz()
    return
  }

  // Atualiza interface
  document.getElementById("questionText").textContent = question.question
  document.getElementById("questionCounter").textContent = `${currentQuiz.currentQuestion + 1}/${
    currentQuiz.questions.length
  }`

  // Atualiza progresso
  const progress = ((currentQuiz.currentQuestion + 1) / currentQuiz.questions.length) * 100
  document.getElementById("progressFill").style.width = `${progress}%`

  // Carrega opções de resposta
  const answersGrid = document.getElementById("answersGrid")
  const options = answersGrid.querySelectorAll(".answer-option")

  options.forEach((option, index) => {
    const optionText = option.querySelector(".option-text")
    optionText.textContent = question.options[index]

    // Remove classes anteriores
    option.classList.remove("selected", "correct", "wrong", "disabled")
  })

  // Inicia timer
  startTimer()
}

/**
 * Inicia o timer da pergunta
 */
function startTimer() {
  currentQuiz.timeLeft = 15
  updateTimerDisplay()

  currentQuiz.timerInterval = setInterval(() => {
    currentQuiz.timeLeft--
    updateTimerDisplay()

    if (currentQuiz.timeLeft <= 0) {
      clearInterval(currentQuiz.timerInterval)
      selectAnswer(-1) // Timeout - resposta incorreta
    }
  }, 1000)
}

/**
 * Atualiza a exibição do timer
 */
function updateTimerDisplay() {
  const timerDisplay = document.getElementById("timerDisplay")
  timerDisplay.textContent = currentQuiz.timeLeft

  // Adiciona classe de aviso quando restam 5 segundos
  if (currentQuiz.timeLeft <= 5) {
    timerDisplay.classList.add("warning")
  } else {
    timerDisplay.classList.remove("warning")
  }
}

/**
 * Seleciona uma resposta
 * @param {number} selectedIndex - Índice da resposta selecionada (-1 para timeout)
 */
function selectAnswer(selectedIndex) {
  if (!currentQuiz.isActive) return

  // Para o timer
  clearInterval(currentQuiz.timerInterval)

  const question = currentQuiz.questions[currentQuiz.currentQuestion]
  const isCorrect = selectedIndex === question.correct
  const isTimeout = selectedIndex === -1

  // Atualiza estatísticas
  if (isCorrect) {
    currentQuiz.correctAnswers++
    const timeBonus = Math.max(0, currentQuiz.timeLeft * 10)
    currentQuiz.score += 100 + timeBonus
  } else {
    currentQuiz.wrongAnswers++
  }

  // Atualiza display de pontuação
  document.getElementById("scoreDisplay").textContent = `Pontos: ${currentQuiz.score}`

  // Marca visualmente as respostas
  const options = document.querySelectorAll(".answer-option")
  options.forEach((option, index) => {
    option.classList.add("disabled")

    if (index === question.correct) {
      option.classList.add("correct")
    } else if (index === selectedIndex && !isCorrect) {
      option.classList.add("wrong")
    }
  })

  // Exibe feedback
  showFeedback(isCorrect, isTimeout, question)
}

/**
 * Exibe feedback da resposta
 * @param {boolean} isCorrect - Se a resposta está correta
 * @param {boolean} isTimeout - Se houve timeout
 * @param {Object} question - Dados da pergunta
 */
function showFeedback(isCorrect, isTimeout, question) {
  const feedbackContainer = document.getElementById("feedbackContainer")
  const feedbackIcon = document.getElementById("feedbackIcon")
  const feedbackTitle = document.getElementById("feedbackTitle")
  const feedbackText = document.getElementById("feedbackText")
  const feedbackPoints = document.getElementById("feedbackPoints")

  if (isTimeout) {
    feedbackIcon.textContent = "⏰"
    feedbackTitle.textContent = "Tempo Esgotado!"
    feedbackTitle.className = "feedback-title wrong"
    feedbackText.textContent = question.explanation
    feedbackPoints.textContent = "+0 pontos"
  } else if (isCorrect) {
    feedbackIcon.textContent = "✅"
    feedbackTitle.textContent = "Correto!"
    feedbackTitle.className = "feedback-title correct"
    feedbackText.textContent = question.explanation
    const timeBonus = Math.max(0, currentQuiz.timeLeft * 10)
    feedbackPoints.textContent = `+${100 + timeBonus} pontos`
  } else {
    feedbackIcon.textContent = "❌"
    feedbackTitle.textContent = "Incorreto!"
    feedbackTitle.className = "feedback-title wrong"
    feedbackText.textContent = question.explanation
    feedbackPoints.textContent = "+0 pontos"
  }

  // Exibe feedback
  feedbackContainer.style.display = "flex"

  // Remove feedback após 3 segundos e avança
  setTimeout(() => {
    feedbackContainer.style.display = "none"
    currentQuiz.currentQuestion++
    loadQuestion()
  }, 3000)
}

/**
 * Finaliza o quiz e exibe resultados
 */
function endQuiz() {
  currentQuiz.isActive = false

  // Calcula estatísticas
  const total = currentQuiz.correctAnswers + currentQuiz.wrongAnswers
  const accuracy = total > 0 ? Math.round((currentQuiz.correctAnswers / total) * 100) : 0

  // Atualiza interface de resultados
  document.getElementById("finalScore").textContent = currentQuiz.score
  document.getElementById("correctAnswers").textContent = currentQuiz.correctAnswers
  document.getElementById("wrongAnswers").textContent = currentQuiz.wrongAnswers
  document.getElementById("accuracyRate").textContent = `${accuracy}%`

  // Determina ícone e mensagem baseados no desempenho
  const resultsIcon = document.getElementById("resultsIcon")
  const performanceMessage = document.getElementById("performanceMessage")

  if (accuracy >= 90) {
    resultsIcon.textContent = "🏆"
    performanceMessage.textContent = "Excelente! Você é um verdadeiro expert nesta matéria!"
  } else if (accuracy >= 70) {
    resultsIcon.textContent = "🥈"
    performanceMessage.textContent = "Muito bom! Você tem um ótimo conhecimento da matéria!"
  } else if (accuracy >= 50) {
    resultsIcon.textContent = "🥉"
    performanceMessage.textContent = "Bom trabalho! Continue estudando para melhorar ainda mais!"
  } else {
    resultsIcon.textContent = "📚"
    performanceMessage.textContent = "Continue praticando! O conhecimento vem com a dedicação!"
  }

  // Muda para tela de resultados
  document.getElementById("quizScreen").style.display = "none"
  document.getElementById("resultsScreen").style.display = "block"
}

/**
 * Reinicia o quiz atual
 */
function restartQuiz() {
  startQuiz()
}

/**
 * Volta para a tela inicial para novo quiz
 */
function newQuiz() {
  document.getElementById("resultsScreen").style.display = "none"
  document.getElementById("startScreen").style.display = "block"
}

/**
 * Embaralha um array (algoritmo Fisher-Yates)
 * @param {Array} array - Array para embaralhar
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

/**
 * Função de logout
 */
function logout() {
  if (confirm("Tem certeza que deseja sair?")) {
    document.body.style.opacity = "0"
    document.body.style.transition = "opacity 0.5s ease"

    setTimeout(() => {
      window.location.href = "index.html"
    }, 500)
  }
}
