/**
 * IgnisTech - Estuda+ | Flashcards JavaScript
 * Gerencia os flashcards interativos com animações de flip
 * Inclui progresso, pontuação e controles de navegação
 */

// Dados dos flashcards organizados por matéria
const flashcardsData = {
  matematica: [
    {
      question: "Qual é a fórmula para calcular a área de um triângulo?",
      answer: "Área = (base × altura) ÷ 2",
    },
    {
      question: "Como resolver a equação 2x + 6 = 14?",
      answer: "2x = 14 - 6\n2x = 8\nx = 4",
    },
    {
      question: "Qual é o resultado de 3/4 + 1/4?",
      answer: "3/4 + 1/4 = 4/4 = 1",
    },
    {
      question: "Quantos graus tem um ângulo reto?",
      answer: "Um ângulo reto tem 90 graus (90°)",
    },
    {
      question: "Qual é a fórmula do perímetro de um quadrado?",
      answer: "Perímetro = 4 × lado",
    },
  ],
  historia: [
    {
      question: "Em que ano o Brasil foi descoberto pelos portugueses?",
      answer: "O Brasil foi descoberto em 1500 por Pedro Álvares Cabral",
    },
    {
      question: "Qual foi o principal produto de exportação do Brasil Colonial?",
      answer: "O açúcar foi o principal produto de exportação durante o período colonial",
    },
    {
      question: "Quando começou a Revolução Industrial?",
      answer: "A Revolução Industrial começou na Inglaterra por volta de 1760",
    },
    {
      question: "Quem foi Dom Pedro I?",
      answer: "Dom Pedro I foi o primeiro imperador do Brasil e proclamou a independência em 1822",
    },
  ],
  ciencias: [
    {
      question: "Quantos planetas existem no Sistema Solar?",
      answer: "Existem 8 planetas no Sistema Solar",
    },
    {
      question: "Qual é a fórmula química da água?",
      answer: "A fórmula química da água é H₂O",
    },
    {
      question: "O que é fotossíntese?",
      answer: "Fotossíntese é o processo pelo qual as plantas produzem seu próprio alimento usando luz solar",
    },
    {
      question: "Qual é o maior planeta do Sistema Solar?",
      answer: "Júpiter é o maior planeta do Sistema Solar",
    },
  ],
  geografia: [
    {
      question: "Qual é a capital do Brasil?",
      answer: "Brasília é a capital do Brasil",
    },
    {
      question: "Quantos estados tem o Brasil?",
      answer: "O Brasil tem 26 estados mais o Distrito Federal",
    },
    {
      question: "Qual é o maior rio do Brasil?",
      answer: "O Rio Amazonas é o maior rio do Brasil",
    },
  ],
  portugues: [
    {
      question: "Quantas vogais existem no alfabeto português?",
      answer: "Existem 5 vogais: A, E, I, O, U",
    },
    {
      question: "O que é um substantivo?",
      answer: "Substantivo é a palavra que nomeia seres, objetos, lugares, sentimentos, etc.",
    },
    {
      question: "Qual é a diferença entre 'mas' e 'mais'?",
      answer: "'Mas' é conjunção (porém), 'mais' indica quantidade ou intensidade",
    },
  ],
}

// Estado da aplicação
let currentSubject = "matematica"
let currentCards = []
let currentCardIndex = 0
let isFlipped = false
let score = { correct: 0, wrong: 0 }
let sessionActive = false

/**
 * Inicializa a página de flashcards
 */
document.addEventListener("DOMContentLoaded", () => {
  initializeFlashcards()
})

/**
 * Configura todos os elementos e eventos da página
 */
function initializeFlashcards() {
  setupSubjectSelector()
  setupFlashcardEvents()
  updateDisplay()

  console.log("IgnisTech Flashcards: Página inicializada com sucesso")
}

/**
 * Configura o seletor de matérias
 */
function setupSubjectSelector() {
  const subjectSelect = document.getElementById("subjectSelect")

  subjectSelect.addEventListener("change", (e) => {
    currentSubject = e.target.value
    resetSession()
    updateDisplay()
  })
}

/**
 * Configura eventos do flashcard
 */
function setupFlashcardEvents() {
  const flashcard = document.getElementById("flashcard")

  flashcard.addEventListener("click", () => {
    if (sessionActive && !isFlipped) {
      flipCard()
    }
  })
}

/**
 * Inicia uma nova sessão de flashcards
 */
function startFlashcards() {
  currentCards = [...flashcardsData[currentSubject]]
  shuffleArray(currentCards)

  currentCardIndex = 0
  score = { correct: 0, wrong: 0 }
  sessionActive = true
  isFlipped = false

  // Atualiza interface
  document.getElementById("startBtn").style.display = "none"
  document.getElementById("restartBtn").style.display = "inline-flex"
  document.getElementById("resultsSection").style.display = "none"

  // Carrega primeiro card
  loadCurrentCard()
  updateProgress()
  updateScore()

  // Adiciona animação de entrada
  const flashcard = document.getElementById("flashcard")
  flashcard.classList.add("animate-in")
}

/**
 * Reinicia a sessão atual
 */
function restartFlashcards() {
  resetSession()
  startFlashcards()
}

/**
 * Reseta o estado da sessão
 */
function resetSession() {
  sessionActive = false
  isFlipped = false
  currentCardIndex = 0
  score = { correct: 0, wrong: 0 }

  // Reseta interface
  document.getElementById("startBtn").style.display = "inline-flex"
  document.getElementById("restartBtn").style.display = "none"
  document.getElementById("resultsSection").style.display = "none"

  const flashcard = document.getElementById("flashcard")
  flashcard.classList.remove("flipped", "disabled")

  updateDisplay()
}

/**
 * Carrega o card atual
 */
function loadCurrentCard() {
  if (!currentCards || currentCardIndex >= currentCards.length) {
    endSession()
    return
  }

  const card = currentCards[currentCardIndex]
  const flashcard = document.getElementById("flashcard")

  // Remove flip se existir
  flashcard.classList.remove("flipped")
  isFlipped = false

  // Atualiza conteúdo
  document.getElementById("questionText").textContent = card.question
  document.getElementById("answerText").textContent = card.answer

  // Atualiza numeração
  const cardNumber = `${currentCardIndex + 1}/${currentCards.length}`
  document.getElementById("cardNumber").textContent = cardNumber
  document.getElementById("cardNumberBack").textContent = cardNumber

  // Remove classes de animação
  flashcard.classList.remove("correct-answer", "wrong-answer", "disabled")

  setTimeout(() => {
    flashcard.classList.remove("animate-in")
  }, 500)
}

/**
 * Vira o flashcard
 */
function flipCard() {
  if (!sessionActive) return

  const flashcard = document.getElementById("flashcard")
  flashcard.classList.add("flipped")
  isFlipped = true
}

/**
 * Marca a resposta como correta ou incorreta
 * @param {boolean} isCorrect - Se a resposta está correta
 */
function markAnswer(isCorrect) {
  if (!sessionActive || !isFlipped) return

  const flashcard = document.getElementById("flashcard")

  // Atualiza pontuação
  if (isCorrect) {
    score.correct++
    flashcard.classList.add("correct-answer")
  } else {
    score.wrong++
    flashcard.classList.add("wrong-answer")
  }

  // Desabilita interações temporariamente
  flashcard.classList.add("disabled")

  // Atualiza displays
  updateScore()
  updateProgress()

  // Avança para próximo card após animação
  setTimeout(() => {
    currentCardIndex++
    loadCurrentCard()
  }, 1500)
}

/**
 * Atualiza a barra de progresso
 */
function updateProgress() {
  const progressText = document.getElementById("progressText")
  const progressFill = document.getElementById("progressFill")

  if (!sessionActive || !currentCards) {
    progressText.textContent = "0 de 0 flashcards"
    progressFill.style.width = "0%"
    return
  }

  const completed = currentCardIndex
  const total = currentCards.length
  const percentage = total > 0 ? (completed / total) * 100 : 0

  progressText.textContent = `${completed} de ${total} flashcards`
  progressFill.style.width = `${percentage}%`
}

/**
 * Atualiza a pontuação
 */
function updateScore() {
  const scoreText = document.getElementById("scoreText")
  scoreText.textContent = `Acertos: ${score.correct} | Erros: ${score.wrong}`
}

/**
 * Atualiza a exibição geral
 */
function updateDisplay() {
  updateProgress()
  updateScore()

  if (!sessionActive) {
    // Exibe card inicial
    document.getElementById("questionText").textContent = "Clique em 'Iniciar' para começar"
    document.getElementById("answerText").textContent = "A resposta aparecerá aqui"
    document.getElementById("cardNumber").textContent = "0/0"
    document.getElementById("cardNumberBack").textContent = "0/0"
  }
}

/**
 * Finaliza a sessão e exibe resultados
 */
function endSession() {
  sessionActive = false

  const total = score.correct + score.wrong
  const percentage = total > 0 ? Math.round((score.correct / total) * 100) : 0

  // Atualiza resultados
  document.getElementById("finalCorrect").textContent = score.correct
  document.getElementById("finalWrong").textContent = score.wrong
  document.getElementById("finalPercentage").textContent = `${percentage}%`

  // Mensagem baseada no desempenho
  let message = ""
  if (percentage >= 90) {
    message = "🎉 Excelente! Você domina muito bem esta matéria!"
  } else if (percentage >= 70) {
    message = "👏 Muito bom! Continue praticando para melhorar ainda mais!"
  } else if (percentage >= 50) {
    message = "📚 Bom trabalho! Revise os conceitos e tente novamente!"
  } else {
    message = "💪 Continue estudando! A prática leva à perfeição!"
  }

  document.getElementById("resultsMessage").textContent = message

  // Exibe seção de resultados
  document.getElementById("resultsSection").style.display = "block"
  document.getElementById("resultsSection").classList.add("animate-in")

  // Atualiza botões
  document.getElementById("startBtn").style.display = "none"
  document.getElementById("restartBtn").style.display = "inline-flex"
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

/**
 * Adiciona suporte a teclas de atalho
 */
document.addEventListener("keydown", (e) => {
  if (!sessionActive) return

  switch (e.key) {
    case " ": // Espaço para virar card
      e.preventDefault()
      if (!isFlipped) {
        flipCard()
      }
      break
    case "1": // Tecla 1 para "Errou"
      if (isFlipped) {
        markAnswer(false)
      }
      break
    case "2": // Tecla 2 para "Acertou"
      if (isFlipped) {
        markAnswer(true)
      }
      break
  }
})

// Adiciona dicas de teclado
setTimeout(() => {
  if (document.querySelector(".flip-hint")) {
    document.querySelector(".flip-hint").innerHTML =
      'Clique no card ou pressione <kbd>Espaço</kbd> para ver a resposta<br><small>Use <kbd>1</kbd> para "Errou" e <kbd>2</kbd> para "Acertou"</small>'
  }
}, 1000)
